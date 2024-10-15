import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string
  const commentId = req.nextUrl.searchParams.get("commentId") as string
  const data = await prisma.like.findFirst({
    where: {
      userId,
      commentId
    }
  })
  if (!data) 
    return NextResponse.json({
      data: null,
      message: `User with id: ${userId} don't like comment with id ${commentId}`
    }, {
      status: 200
    })
  return NextResponse.json({
    data,
    message: `User with id: ${userId} liked comment with id ${commentId}`
  }, {
    status: 200
  })
}

export async function POST(
  request: Request
) {
  const info = await request.json()
  const {commentId, userId} = info
  if (!commentId || !userId)
    return NextResponse.json({
      message: "Missing field"
    }, {
      status: 300
    })
  const existLike = await prisma.like.findFirst({
    where: {
      userId,
      commentId
    }
  })
  if (existLike) return NextResponse.json({
    data: existLike,
    message: `User with id: ${userId} liked comment with id: ${commentId}`
  }, {
    status: 400
  })
  const like = await prisma.like.create({
    data: {
      userId,
      commentId
    }
  })
  return NextResponse.json({
    data: like
  }, {
    status: 200
  })
}