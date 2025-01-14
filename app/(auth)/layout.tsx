import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[400px] items-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
