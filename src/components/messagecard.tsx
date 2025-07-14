'use client'
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { X } from 'lucide-react'
import { Button } from './ui/button'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios'
import { toast } from 'sonner'

type Messagecardprops = {
    message: any,
    onMessageDelete: (messageId: string) => void
}
const MessageCard = ({ message, onMessageDelete }: Messagecardprops) => {

    const handleDeleteConfrom =async () => {
      const respose =await axios.delete(`/api/delete-message/${message._id}`)
      toast.success(respose.data.message)
      onMessageDelete(message._id)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{message.name}</CardTitle>
                {/* <AlertDialogDemo /> */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><X className="h-4 w-4"></X></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => { handleDeleteConfrom() }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <CardDescription>{message.email}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{message.message}</p>
            </CardContent>
            <CardFooter>
                <CardAction>
                    <p>Reply</p>
                </CardAction>
            </CardFooter>
        </Card>
    )
}

export default MessageCard