"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { handleEditProfile, handleCreateProfile } from "@utils/profileHandlers"
import Editor from "@components/Editor"
import Button from "@components/Button"
import {
  CreateProfileSchema,
  editProfileSchema,
  type ProfileFormValues,
  type CreateProfileFormValues,
} from "@schemas/profileSchemas"

type Props = {
  id?: string | null
  profileData?: {
    email: string
    password?: string
    firstName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    details: string | null
    profilePicture: string | null
    createdAt: Date
  } | null
  isSetup?: boolean
  isEdit?: boolean
}

const formatDateForInput = (date: Date | string | undefined | null): string => {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toISOString().split("T")[0] // Returns "yyyy-MM-dd"
}

const ProfileForm = ({ id, profileData, isSetup, isEdit }: Props) => {
  const router = useRouter()
  const profileSchema = isEdit ? editProfileSchema : CreateProfileSchema

  const formattedProfileData = profileData
    ? {
        ...profileData,
        dateOfBirth: formatDateForInput(profileData.dateOfBirth),
      }
    : {}

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: formattedProfileData || {},
  })

  const onSubmit = async (data: ProfileFormValues) => {
    if (isEdit && id) {
      await handleEditProfile({
        id,
        data,
        isSetup,
        router,
      })
    } else {
      await handleCreateProfile({
        data: data as CreateProfileFormValues,
        router,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-4 rounded-md bg-white px-6 py-4 shadow-md"
    >
      <h2 className="text-xl font-bold text-black">{`${isEdit ? "Edit Profile" : "Create Profile"}`}</h2>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-black">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mb-4 mt-2 h-10 w-full rounded-md border border-light-grey px-4 text-sm font-bold text-black outline-purple active:border-purple"
        />
        {errors.email && (
          <p className="text-sm text-red">{errors.email.message}</p>
        )}
      </div>
      {!isEdit && (
        <div>
          <label htmlFor="email" className="text-sm font-medium text-black">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mb-4 mt-2 h-10 w-full rounded-md border border-light-grey px-4 text-sm font-bold text-black outline-purple active:border-purple"
          />
          {"password" in errors && (
            <p className="text-sm text-red">{errors.password?.message}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="firstName" className="text-sm font-medium text-black">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className="mb-4 mt-2 h-10 w-full rounded-md border border-light-grey px-4 text-sm font-bold text-black outline-purple active:border-purple"
        />
        {errors.firstName && (
          <p className="text-sm text-red">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="text-sm font-medium text-black">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          className="mb-4 mt-2 h-10 w-full rounded-md border border-light-grey px-4 text-sm font-bold text-black outline-purple active:border-purple"
        />
        {errors.lastName && (
          <p className="text-sm text-red">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="text-sm font-medium text-black">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          {...register("dateOfBirth")}
          className="mb-4 mt-2 h-10 w-full rounded-md border border-light-grey px-4 text-sm font-bold text-black outline-purple active:border-purple"
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-red">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="details-editor"
          className="text-sm font-medium text-black"
        >
          Details
        </label>
        <div id="details-editor" className="mb-4 mt-2 h-60">
          <Editor profileData={profileData} setValue={setValue} />
        </div>
        {errors.details && (
          <p className="text-sm text-red">{errors.details.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="profilePicture"
          className="text-sm font-medium text-black"
        >
          Profile Picture URL
        </label>
        <input
          id="profilePicture"
          type="text"
          {...register("profilePicture")}
          className="mb-4 mt-2 h-10 w-full rounded-md border border-light-grey px-4 text-sm font-bold text-black outline-purple active:border-purple"
        />
        {errors.profilePicture && (
          <p className="text-sm text-red">{errors.profilePicture.message}</p>
        )}
      </div>

      <Button color="purple" type="submit">
        Submit
      </Button>
    </form>
  )
}
export default ProfileForm
