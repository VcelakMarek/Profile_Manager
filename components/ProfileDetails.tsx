import { Profile } from "@prisma/client"
import Button from "@components/Button"

type Props = {
  profileData: Omit<Profile, "password" | "updatedAt">
  isCurrentUser?: boolean
}

const ProfileDetails = ({ profileData, isCurrentUser }: Props) => {
  return (
    <div className="m-auto flex w-screen max-w-4xl flex-col rounded-lg bg-white p-6 align-middle shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-black">
          {profileData.firstName}&nbsp;{profileData.lastName}
        </h1>
        {profileData.profilePicture && (
          <img
            src={profileData.profilePicture}
            alt={`${profileData.firstName} ${profileData.lastName} Profile`}
            width={100}
            height={100}
            className="rounded-full border-4 border-light-grey"
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Email</h2>
          <p className="text-base font-normal text-black">
            {profileData.email}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2>Date of Birth</h2>
          <p className="text-base font-normal text-black">
            {profileData.dateOfBirth
              ? new Date(profileData.dateOfBirth).toLocaleDateString()
              : "No Date Provided"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2>Details</h2>
          <div
            className="text-base font-normal text-black"
            dangerouslySetInnerHTML={{
              __html: profileData.details || <p>No Details Provided</p>,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <h2>Account Created</h2>
          <p className="text-base font-normal text-black">
            {new Date(profileData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {isCurrentUser ? (
          <Button color="purple" link={`/setup-profile`}>
            Setup Profile
          </Button>
        ) : (
          <Button color="purple" link={`/profiles/${profileData.id}/edit`}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProfileDetails
