import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("episodeId") as string;
  const userId = req.nextUrl.searchParams.get("userId") as string;
  if (!id || !userId)
    return NextResponse.json(
      {
        message: "Missing episodeId to fetch the number of likes",
      },
      {
        status: 400,
      }
    );
  const data = await prisma.likedEpisode.count({
    where: {
      episodeId: id,
    },
  });
  const userLike = await prisma.likedEpisode.findFirst({
    where: {
      episodeId: id,
      userId
    },
  });
  return NextResponse.json(
    {
      data: {
        count: data,
        userLike: userLike ? true : false
      }
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const info = await request.json();
  const { episodeId, userId } = info;

  // Check for missing fields
  if (!episodeId || !userId) {
    return NextResponse.json(
      {
        message: "Missing field",
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  try {
    // Check if the episode is already liked by the user
    const existingLike = await prisma.likedEpisode.findFirst({
      where: {
        episodeId,
        userId,
      },
    });

    if (existingLike) {
      // Delete the existing like
      await prisma.likedEpisode.delete({
        where: {
          id: existingLike.id, // Use the ID of the existing like to delete it
        },
      });

      return NextResponse.json(
        {
          message: "User's like removed from this episode",
        },
        {
          status: 200, // OK
        }
      );
    }

    // Create a new like if it doesn't exist
    const newLike = await prisma.likedEpisode.create({
      data: {
        episodeId,
        userId,
      },
    });

    return NextResponse.json(
      {
        data: newLike,
        message: "User liked this episode"
      },
      {
        status: 201, // Created
      }
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error while liking or unliking episode:", error);
    
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500, // Server Error
      }
    );
  }
}