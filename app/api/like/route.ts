import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get a like information
export async function GET() {
  const data = await prisma.like.findMany()
  return NextResponse.json({
    data
  }, {
    status: 200
  })
}

export async function POST(
  request: NextRequest
) {
  const commentId = request.nextUrl.searchParams.get("commentId")
  const userId = request.nextUrl.searchParams.get("userId")
  return NextResponse.json({
    commentId,
    userId
  }, {
    status: 200
  })
}