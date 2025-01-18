import prisma from "@lib/db"
import PageHeader from "@components/Header"
import Profile from "@components/Profile"
import { getCurrentUser } from "@utils/users"
import type { ProfileTypes } from "@/types/ProfileTypes"

const ProfilesPage = async () => {
  const { id: currentUserId } = await getCurrentUser()
  const profiles = await prisma.profile.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex h-screen w-screen flex-col bg-light-bg">
      <PageHeader isProfileList profileCount={profiles.length} />
      <main className="mt-16 grid place-items-center">
        {profiles.length > 0 ? (
          profiles.map((profile: ProfileTypes) => (
            <Profile
              key={profile.id}
              profileData={profile}
              isCurrentUser={profile.id === currentUserId}
            />
          ))
        ) : (
          <p>Profiles not found</p>
        )}
      </main>
    </div>
  )
}

export default ProfilesPage
