// app/api/route.js 👈🏽
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { InfoResponse } from "@/types/anime/info";
import { getAnimeTitle } from "@/utils/constant";

// To handle a GET request to /api
export async function GET(
  // request : NextApiRequest,
  request: NextRequest
) {
  const animeId = request.nextUrl.searchParams.get("animeId") as string;
  const parentId = request.nextUrl.searchParams.get("parentId") as string;
  const comment = await prisma.comment.findMany({
    where: {
      parentId,
      animeId,
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
      parentId: true
    }
  });
  if (!comment)
    return NextResponse.json(
      { message: "Comment not found ...", data: {} },
      { status: 404 }
    );
  return NextResponse.json(
    { data: comment, message: "Comment got successfully!" },
    { status: 200 }
  );
}

// To handle a POST request to /api
export async function POST(request: Request) {
  // Do whatever you want
  const body = await request.json();
  const { text, userId, animeId, animeName, parentId } = body;
  if (!text || !userId || !animeId)
    return NextResponse.json({ message: "Missing field ..." }, { status: 500 });
  // check usesrId and animeId is valid: is mongoose id
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json(
      { message: "User not found ..." },
      { status: 500 }
    );
  const anime: InfoResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/info/${animeId}?provider=gogoanime`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  if (!anime.id)
    return NextResponse.json(
      { message: "Anime not found ...", data: {} },
      { status: 500 }
    );
  const comment = await prisma.comment.create({
    data: {
      animeId: anime.id,
      animeName: getAnimeTitle(anime.title) as string,
      userId,
      text,
      parentId: parentId || "",
    },
  });
  return NextResponse.json(
    { data: comment, message: "Comment is created successfully!" },
    { status: 200 }
  );
}

// Same logic to add a `PATCH`, `DELETE`...
