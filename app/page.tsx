import { notFound } from "next/navigation"
import prisma from "@lib/db"
import { getCurrentUser } from "@utils/users"
import ProfileDetails from "@components/ProfileDetails"
import PageHeader from "@components/Header"

const HomePage = async () => {
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

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <PageHeader titleText="Profile Manager" canSignout hasProfiles />
      <div>
        <ProfileDetails isCurrentUser profileData={profile} />
      </div>
    </div>
  )
}

export default HomePage
