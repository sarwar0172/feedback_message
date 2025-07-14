"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from "next-auth"
import { Button } from './ui/button'

function Navbar() {
  const {data: session} = useSession()
  const user:User=session?.user
  return (
    <nav>
      <div className='mt-2'>
        <a href="#">Mystry Message</a>
        {
          session?(<>
          <span>Welcom {user?.username}</span>
            <Button onClick={() => signOut()}>Logout</Button>

          </>
          ):(
            <>
            <Link href="/login" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >Login</Link>
            <Link href="/register" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Register</Link>
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
