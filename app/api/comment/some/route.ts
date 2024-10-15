import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET() {
  const comment = await prisma.comment.findMany({
    select: {
      _count: {
        select: {
          children: true,
          likes: true
        }
      },
      id: true,
      user: true,
      text: true,
      animeId: true,
      animeName: true,
      animeColor: true,
      animeCover: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: 0,
    take: 3
  });
  if (!comment)
    return NextResponse.json(
      { message: "Comments not found ...", data: {} },
      { status: 404 }
    );
  return NextResponse.json(
    { data: comment, message: "Comments got successfully!" },
    { status: 200 }
  );
}