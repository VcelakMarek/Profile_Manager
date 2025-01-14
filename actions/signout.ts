"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { COOKIE_NAME } from "@/utils/constants"

export const signout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  redirect("/signin")
}
