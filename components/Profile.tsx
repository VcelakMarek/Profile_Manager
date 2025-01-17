"use client"
import Link from "next/link"
import { handleDeleteProfile } from "@utils/profileHandlers"
import Button from "@components/Button"

type Props = {
  profileData: {
    id: string
    firstName: string | null
    lastName: string | null
    dateOfBirth: Date | null
  }
  isCurrentUser?: boolean
}

const Profile = ({ profileData, isCurrentUser }: Props) => {
  const date = profileData.dateOfBirth
    ? profileData.dateOfBirth.toLocaleDateString()
    : "No Date Provided"

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await handleDeleteProfile(profileData.id)
  }
  return (
    <Link
      href={`/profiles/${profileData.id}`}
      className="mb-4 flex h-[72px] w-[65%] items-center justify-between rounded-lg border-[1.5px] border-transparent bg-white px-[2%] drop-shadow hover:border-[1.5px] hover:border-[#7C5DFA]"
    >
      <h3 className="basis-3/6 text-start">
        {profileData?.firstName}&nbsp;{profileData?.lastName}
      </h3>
      <h4 className="basis-1/6 text-center">{date}</h4>

      <Button color="red" onClick={handleDelete} invisible={isCurrentUser}>
        Delete
      </Button>
    </Link>
  )
}

export default Profile
