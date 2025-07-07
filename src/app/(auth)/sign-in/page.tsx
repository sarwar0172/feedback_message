'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <>
    <p>Signed in as {session.user.email}</p>
    <button onClick={() => signOut()}>Sign out</button>
    </>

  }

  return (
    <>
      Not signed in <br />
      
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded m-2" onClick={() => signIn()}>Sign in</button>
    </>
  )
}
