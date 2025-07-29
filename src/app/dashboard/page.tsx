"use client"
import { isAcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { profile } from 'console';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Switch from "react-switch";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Message } from '@/model/user';
function Dashboard() {

const [messages,setMessages]=useState([]);
const [loading,setLoading]=useState(false);
const [isSwitchLoading,setIsSwitchLoading]=useState(false);
const [link,setLink]=useState("");


const {data:session}=useSession();

const form=useForm({
    resolver:zodResolver(isAcceptMessageSchema),
    defaultValues: {
      Acceptmessage: false,
    },
});
const {username}=session?.user || {};
useEffect(()=>{
const baseUrl=`${window.location.protocol}//${window.location.host}`;
setLink(`${baseUrl}/user/${username}`)
},[username])

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  } catch (err) {
    console.error('Failed to copy link to clipboard:', err);
  }
};

const {register,watch,setValue}=form;
const acceptMessage=watch("Acceptmessage");
const handleSwitchChange= async()=>{
  try{
      const response=await axios.post("/api/accept-message",{
       Acceptmessage:!acceptMessage
     }); 
    setValue("Acceptmessage",!acceptMessage);
     toast.success(response.data.message);
    
  }catch(e){
    const axiosError=e as AxiosError<ApiResponse>;
    toast.error(axiosError.response?.data.message);
  }
}

useEffect(()=>{
  const fetchMessage=async()=>{
    setIsSwitchLoading(true);
    try{
        
        const response=await axios.get("/api/accept-message");
        setValue("Acceptmessage",response.data.isAcceptingMessages);
        setIsSwitchLoading(false);
    }catch(e){
      const axiosError=e as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message);
      setIsSwitchLoading(false);
    }
  }
  fetchMessage();

},[setValue])


useEffect(()=>{

  const fetchMessage=async()=>{
    setLoading(true);
    try{
        
        const response=await axios.get("/api/get-message");
        setMessages(response.data.messages);
        setLoading(false);
        

    }catch(e){
      toast.error("something went wrong while fetching message");
      setLoading(false);
    }
  }
  fetchMessage();
},[])

const handleDeleteMessage=async(id:string)=>{
  try{
    const response=await axios.delete(`/api/delete-message/${id}`);
    toast.success(response.data.message);
    setMessages(messages.filter((message:Message)=>message._id!==id));
  }catch(e){
    const axiosError=e as AxiosError<ApiResponse>;
    toast.error(axiosError.response?.data.message);
  }
}

if (!session || !session.user) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Please Login</h2>
        <p className="text-gray-600">You must be signed in to access this page.</p>
      </div>
    </div>
  );
}


  return (
   <div className="my-8 mx-4 sm:mx-6 md:mx-8 lg:mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-4xl transition-all duration-300">
  <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">Dashboard</h1>

  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3 text-gray-800">Copy Your Unique Link</h2>
    
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <input
        type="text"
        value={link}
        readOnly
        className="w-full sm:flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
      <button
        onClick={copyToClipboard}
        className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      >
        Copy Link
      </button>
    </div>
    <div className="mt-4 flex items-center gap-3">
      <Switch 
        {...register("Acceptmessage")} 
        onChange={handleSwitchChange} 
        checked={acceptMessage}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors duration-200 ease-in-out data-[checked]:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      <span className="text-sm font-medium text-gray-700">
        Accepting Messages: <span className={acceptMessage ? "text-green-600" : "text-red-600"}>{acceptMessage ? "Yes" : "No"}</span>
      </span>
    </div>
  </div>
 <div className="max-w-2xl mx-auto mt-8 space-y-6">
  {messages.length > 0 ? (
    messages.map((message: Message, index) => (
      <div
        key={index}
        className="relative p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-2">Message #{index + 1}</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
        <p className="text-sm text-gray-400 mt-3">
          {new Date(message.createdAt).toLocaleString()}
        </p>

        <button
          onClick={() => handleDeleteMessage(message._id as any)}
          className="absolute top-3 right-3 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 text-lg">No messages yet.</p>
  )}
</div>


</div>

  )
}

export default Dashboard
