import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string;
  if (!userId)
    return NextResponse.json(
      {
        message: "Missing userId to fetch the list!",
      },
      {
        status: 400,
      }
    );
  const data = await prisma.list.findMany({
    where: {
      userId,
    },
    select: {
      animeColor: true,
      animeId: true,
      animeImage: true,
      animeTitle: true,
      animeType: true,
      id: true,
    },
  });
  return NextResponse.json(
    {
      data,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const info = await request.json();
  const {
    animeId,
    animeImage,
    animeTitle,
    animeType,
    animeColor,
    nextEpisodeTime,
    userId,
  } = info;

  // Check for missing fields
  if (!animeId || !userId) {
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
    const existingList = await prisma.list.findFirst({
      where: {
        animeId,
        userId,
      },
    });

    if (existingList) {
      // Delete the existing like
      await prisma.list.delete({
        where: {
          id: existingList.id, // Use the ID of the existing like to delete it
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

    // Add a new anime if it doesn't exist
    const newList = await prisma.list.create({
      data: {
        userId,
        animeColor,
        animeId,
        animeImage,
        animeTitle,
        animeType,
        nextEpisodeTime,
      },
    });

    return NextResponse.json(
      {
        data: newList,
        message: "User liked this episode",
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

export async function PUT(request: Request) {
  const info = await request.json();
  const { animeId, userId } = info;

  // Check for missing fields
  if (!animeId || !userId) {
    return NextResponse.json(
      {
        message: "Missing field",
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  const existingList = await prisma.list.findFirst({
    where: {
      animeId,
      userId,
    },
  });

  return NextResponse.json(
    {
      message: "User's like removed from this episode",
      isExist: existingList ? true : false,
    },
    {
      status: 200, // OK
    }
  );
}

export async function DELETE(request: Request) {
  const info = await request.json();
  const { animeId, userId } = info;

  // Check for missing fields
  if (!animeId || !userId) {
    return NextResponse.json(
      {
        message: "Missing field",
        isDeleted: false,
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  const existingList = await prisma.list.findFirst({
    where: {
      animeId,
      userId,
    },
  });

  if (!existingList) return NextResponse.json(
    {
      message: "User's like already removed from this episode",
      isDeleted: false,
    },
    {
      status: 200, // OK
    }
  );

  // Delete the existing like
  await prisma.list.delete({
    where: {
      id: existingList.id, // Use the ID of the existing like to delete it
    },
  });
  return NextResponse.json(
    {
      message: "User's anime removed from this episode",
      isDeleted: true,
    },
    {
      status: 200, // OK
    }
  );
}
