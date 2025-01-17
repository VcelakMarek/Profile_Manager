import { z } from "zod"

const passwordSchema = z
  .string()
  .min(5, { message: "Password must be at least 8 characters long" })
  .regex(/[0-9]/, { message: "Password must include at least one number" })
  .regex(/^\S*$/, { message: "Password must not contain spaces" })

export const editProfileSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .string()
    .nonempty("Date of Birth is required")
    .refine((date) => !Number.isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    }),
  details: z.string().optional(),
  profilePicture: z.string().nullable().optional(),
})

export type EditProfileFormValues = z.infer<typeof editProfileSchema>

export const CreateProfileSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: passwordSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .string()
    .nonempty("Date of Birth is required")
    .refine((date) => !Number.isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    }),
  details: z.string().optional(),
  profilePicture: z.string().nullable().optional(),
})

export type CreateProfileFormValues = z.infer<typeof CreateProfileSchema>

export type ProfileFormValues = EditProfileFormValues | CreateProfileFormValues
