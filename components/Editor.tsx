import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Bold } from "@tiptap/extension-bold"
import { Italic } from "@tiptap/extension-italic"
import { Strike } from "@tiptap/extension-strike"
import { Heading } from "@tiptap/extension-heading"
import { UseFormSetValue } from "react-hook-form"
import Button from "@components/Button"
import type { ProfileFormValues } from "@schemas/profileSchemas"

type Props = {
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
  setValue: UseFormSetValue<ProfileFormValues>
}

const Editor = ({ profileData, setValue }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Strike, Heading],
    content: profileData?.details || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      setValue("details", content || "")
    },
  })

  return (
    <div className="h-full w-full rounded-md border border-light-grey p-3">
      <div className="toolbar mb-4 flex gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor?.chain().focus().toggleBold().run()
          }}
        >
          Bold
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor?.chain().focus().toggleItalic().run()
          }}
        >
          Italic
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor?.chain().focus().toggleStrike().run()
          }}
        >
          Strike
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }}
        >
          H1
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
