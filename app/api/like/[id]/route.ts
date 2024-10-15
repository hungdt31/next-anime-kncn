import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const like = await prisma.like.findUnique({
    where: {
      id,
    },
  });
  if (!like) {
    return NextResponse.json(
      { message: `Like with id: ${id} not found`, data: {} },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { data: like, message: `Like with id: ${id} got successfully!` },
    { status: 200 }
  );
}

export async function DELETE(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const like = await prisma.like.findUnique({
    where: {
      id,
    },
  });
  if (!like) {
    return NextResponse.json(
      { message: `Like with id: ${id} not found`, data: {} },
      { status: 404 }
    );
  }
  const deletedLike = await prisma.like.delete({
    where: {
      id: like.id,
    },
  });
  return NextResponse.json(
    { data: deletedLike, message: `Like with id: ${id} deleted successfully!` },
    { status: 200 }
  );
}