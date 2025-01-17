import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { getUserFromToken } from "@utils/authTools"
import { COOKIE_NAME } from "@utils/constants"

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)
  if (!token) redirect("/signin")

  const user = await getUserFromToken(token)
  if (!user) redirect("/signin")
  return user
})
