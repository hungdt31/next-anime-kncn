import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
  const id = request.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json(
    null, {
      status: 200
    }
  );
  const data = await prisma.comment.findFirst({
    where: {
      id,
    },
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
      parentId: true,
      createdAt: true
    }
  });
  return NextResponse.json(
    data, {
      status: 200
    }
  );
}