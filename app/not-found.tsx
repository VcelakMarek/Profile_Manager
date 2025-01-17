"use client"
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-light-bg text-center">
      <h1>404</h1>
      <p className="mt-4 text-xl text-grey">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-purple px-6 py-3 font-bold text-white transition hover:bg-purple-hover"
      >
        Go back to Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage
