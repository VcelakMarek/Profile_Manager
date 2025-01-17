import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import prisma from "@lib/db"

const SECRET = process.env.JWT_SECRET || "use_an_ENV_VAR"

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET)
  return token
}

export const getUserFromToken = async (token: {
  name: string
  value: string
}) => {
  try {
    const payload = jwt.verify(token.value, SECRET) as { id: string }

    const user = await prisma.profile.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    })

    return user
  } catch {
    throw new Error("Invalid or expired token")
  }
}

export const signin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const match = await prisma.profile.findUnique({
    where: { email },
  })

  if (!match) throw new Error("Invalid user")

  const correctPW = await comparePW(password, match.password)

  if (!correctPW) {
    throw new Error("Invalid credentials")
  }

  const token = createTokenForUser(match.id)
  const { password: _pw, ...user } = match

  return { user, token }
}

export const signup = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const hashedPW = await hashPW(password)

  const user = await prisma.profile.create({
    data: {
      email,
      password: hashedPW,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  })

  const token = createTokenForUser(user.id)

  return { user, token }
}

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW)
}
