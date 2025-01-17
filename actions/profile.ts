"use server"
import { revalidatePath } from "next/cache"
import prisma from "@lib/db"
import { hashPW } from "@utils/authTools"

export const createProfile = async (formData: FormData) => {
  const hashedPW = await hashPW(formData.get("password") as string)
  const dateOfBirth = `${formData.get("dateOfBirth")}T00:00:00Z`

  await prisma.profile.create({
    data: {
      email: formData.get("email") as string,
      password: hashedPW,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      dateOfBirth: dateOfBirth,
      details: formData.get("details") as string,
      profilePicture: formData.get("profilePicture") as string,
    },
  })
}

export const editProfile = async (id: string, formData: FormData) => {
  const dateOfBirthString = formData.get("dateOfBirth") as string
  const dateOfBirth = `${dateOfBirthString}T00:00:00Z`

  await prisma.profile.update({
    where: { id },
    data: {
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      dateOfBirth: dateOfBirth,
      details: formData.get("details") as string,
      profilePicture: formData.get("profilePicture") as string,
    },
  })
}

export const deleteProfile = async (id: string) => {
  await prisma.profile.delete({ where: { id } })
  revalidatePath("/profiles")
}
