import { useRouter } from "next/navigation"
import type {
  EditProfileFormValues,
  CreateProfileFormValues,
} from "@schemas/profileSchemas"

export type HandleEditProfileProps = {
  id: string
  data: EditProfileFormValues
  isSetup?: boolean
  router: ReturnType<typeof useRouter>
}

export type HandleCreateProfileProps = {
  data: CreateProfileFormValues
  router: ReturnType<typeof useRouter>
}

export type ProfileTypes = {
  id: string
  firstName: string | null
  lastName: string | null
  dateOfBirth: Date | null
}
