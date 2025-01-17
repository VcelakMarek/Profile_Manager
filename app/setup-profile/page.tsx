import { notFound } from "next/navigation"
import prisma from "@lib/db"
import { getCurrentUser } from "@utils/users"
import ProfileForm from "@components/ProfileForm"

const SetupProfilePage = async () => {
  const { id } = await getCurrentUser()

  const profile = await prisma.profile.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      details: true,
      profilePicture: true,
      createdAt: true,
    },
  })

  if (!profile) {
    notFound()
  }

  return <ProfileForm isSetup id={id} profileData={profile} isEdit />
}

export default SetupProfilePage
