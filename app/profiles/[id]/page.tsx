import { notFound } from "next/navigation"
import prisma from "@lib/db"
import ProfileDetails from "@components/ProfileDetails"
import PageHeader from "@components/Header"

type Props = {
  params: Promise<{ id: string }>
}

const DetailsPage = async ({ params }: Props) => {
  const { id } = await params
  if (!id) {
    console.error("Profile ID is missing")
    return notFound()
  }

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

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <PageHeader titleText="Profile" canGoBack />
      <div>
        <ProfileDetails profileData={profile} />
      </div>
    </div>
  )
}
export default DetailsPage
