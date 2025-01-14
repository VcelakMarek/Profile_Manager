"use client"
import { useActionState } from "react"
import Link from "next/link"
import Button from "@components/Button"
import { registerUser } from "@actions/auth"

const initState = { message: "" }

const SignupForm = () => {
  const [errorMessage, action, isPending] = useActionState(
    registerUser,
    initState,
  )

  return (
    <form
      action={action}
      className="bg-content1 border-default-100 flex flex-col gap-2 rounded-md border p-3 shadow-lg"
    >
      <h3 className="my-4">Sign up</h3>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />

      <Button color="grey" type="submit">
        {isPending ? (
          <div className="m-auto h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-light-blue"></div>
        ) : (
          "Sign up"
        )}
      </Button>

      <div>
        <Link href="/signin">{`Already have an account?`}</Link>
      </div>
      {errorMessage?.message && (
        <p className="text-red">{errorMessage.message}</p>
      )}
    </form>
  )
}

export default SignupForm
