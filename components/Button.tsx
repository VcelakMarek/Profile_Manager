"use client"
import { ButtonHTMLAttributes, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  color?: "red" | "purple" | "grey" | "transparent"
  children?: ReactNode
  canGoBack?: boolean
  hasIcon?: boolean
  invisible?: boolean
  link?: string
} & ButtonHTMLAttributes<HTMLButtonElement>
// ☝🏻 Contains all the attributes of a button element (onClick, type,...)

const backgroundColor = {
  red: "bg-red hover:bg-red-hover",
  purple: "bg-purple hover:bg-purple-hover",
  grey: "bg-[#e6e8f5] hover:bg-light-grey",
  transparent: "",
}

const textColor = {
  red: "text-white",
  purple: "text-white",
  grey: "text-light-blue",
  darkBlue: "text-grey",
  transparent: "",
}

const Button = ({
  color = "transparent",
  canGoBack,
  children,
  hasIcon,
  invisible,
  link,
  ...rest
}: Props) => {
  const router = useRouter()

  const border = "rounded-full"
  const dimensions = !hasIcon ? `h-12 pl-6 pr-6` : " pl-5 pb-2"
  const text = "font-bold text-xs tracking-[1px]"
  const flex = "flex items-center gap-4 "

  const baseClasses = [
    backgroundColor[color],
    textColor[color],
    border,
    dimensions,
    text,
    invisible ? "invisible" : null,
  ]

  const linkClasses = baseClasses.concat(flex)

  if (canGoBack) {
    return (
      <button
        {...rest}
        className={linkClasses.join(" ")}
        onClick={() => {
          router.back()
        }}
      >
        Go back
      </button>
    )
  }

  if (link) {
    return (
      <Link href={link} className={linkClasses.join(" ")}>
        {children}
      </Link>
    )
  }

  return (
    <button {...rest} className={baseClasses.join(" ")}>
      {children}
    </button>
  )
}

export default Button
