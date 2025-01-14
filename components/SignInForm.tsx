"use client"
import { useActionState } from "react"
import Link from "next/link"
import Button from "@components/Button"
import { signinUser } from "@actions/auth"

const initState = { message: "" }

const SigninForm = () => {
  const [errorMessage, action, isPending] = useActionState(
    signinUser,
    initState,
  )

  return (
    <form
      action={action}
      className="bg-content1 border-default-100 flex flex-col gap-2 rounded-md border p-3 shadow-lg"
    >
      <h3 className="my-4">Sign in</h3>
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
          "Sign in"
        )}
      </Button>
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
      {errorMessage?.message && (
        <p className="text-red">{errorMessage.message}</p>
      )}
    </form>
  )
}

export default SigninForm
