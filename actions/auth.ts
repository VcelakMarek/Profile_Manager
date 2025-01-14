"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { COOKIE_NAME } from "@utils/constants"
import { signin, signup } from "@utils/authTools"

const passwordSchema = z
  .string()
  .min(5, { message: "Password must be at least 8 characters long" })
  .regex(/[0-9]/, { message: "Password must include at least one number" })
  .regex(/^\S*$/, { message: "Password must not contain spaces" })

const registerSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (_prevState: unknown, formData: FormData) => {
  const cookieStore = await cookies()
  const data = registerSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  try {
    const { token } = await signup(data)
    cookieStore.set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: "Failed to sign you up" }
  }

  redirect("/")
}

export const signinUser = async (_prevState: unknown, formData: FormData) => {
  const cookieStore = await cookies()
  const data = signinSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  try {
    const { token } = await signin(data)
    cookieStore.set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: "Failed to sign you in" }
  }

  redirect("/")
}
