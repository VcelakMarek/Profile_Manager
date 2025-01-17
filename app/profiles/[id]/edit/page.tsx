import { notFound } from "next/navigation"
import prisma from "@lib/db"
import ProfileForm from "@components/ProfileForm"

type Props = {
  params: Promise<{ id: string }>
}

const EditPage = async ({ params }: Props) => {
  const { id } = await params

  if (!id) {
    console.error("Profile ID is missing")
    return notFound()
  }

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
    select: {
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
    return notFound()
  }

  return <ProfileForm id={id} profileData={profile} isEdit />
}

export default EditPage
