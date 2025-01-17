"use client"
import { useState } from "react"
import Button from "@components/Button"
import { signout } from "@actions/signout"

const Signout = () => {
  const [isPending, setIsPending] = useState(false)

  const handleSignout = async () => {
    setIsPending(true)
    try {
      await signout()
    } catch (error) {
      console.error("Logout failed", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button color="grey" onClick={() => handleSignout()}>
      {isPending ? (
        <div className="m-auto h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-light-blue"></div>
      ) : (
        "Sign out"
      )}
    </Button>
  )
}

export default Signout
