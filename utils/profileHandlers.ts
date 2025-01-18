import { editProfile, createProfile, deleteProfile } from "@actions/profile"
import type {
  EditProfileFormValues,
  CreateProfileFormValues,
} from "@schemas/profileSchemas"
import type {
  HandleEditProfileProps,
  HandleCreateProfileProps,
} from "@/types/ProfileTypes"

export const handleEditProfile = async ({
  id,
  data,
  isSetup,
  router,
}: HandleEditProfileProps) => {
  try {
    const formData = new FormData()
    for (const key in data) {
      const value = data[key as keyof EditProfileFormValues]
      formData.append(key, value || "")
    }

    await editProfile(id, formData)
    alert("Profile updated successfully!")

    if (isSetup) {
      router.replace("/")
    } else {
      router.replace(`/profiles/${id}`)
    }
  } catch (error: unknown) {
    console.error("Unexpected error", error)
    alert("An unexpected error occurred.")
  }
}

export const handleCreateProfile = async ({
  data,
  router,
}: HandleCreateProfileProps) => {
  try {
    const formData = new FormData()
    for (const key in data) {
      const value = data[key as keyof CreateProfileFormValues]
      formData.append(key, value || "")
    }
    await createProfile(formData)
    alert("Profile Created successfully!")

    router.replace(`/profiles`)
  } catch (error: unknown) {
    console.error("Unexpected error", error)
    alert("An unexpected error occurred.")
  }
}

export const handleDeleteProfile = async (id: string) => {
  try {
    await deleteProfile(id)
    alert("Profile deleted successfully!")
  } catch (error) {
    console.error("Error deleting profile:", error)
    alert("An error occurred while deleting the profile. Please try again.")
  }
}
