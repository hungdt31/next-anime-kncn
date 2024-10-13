import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function DELETE(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  if (!comment) {
    return NextResponse.json(
      { message: `Comment with id: ${id} not found`, data: {} },
      { status: 404 }
    );
  }
  const data = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(
    { data, message: `Comment with id: ${id} is deleted successfully!` },
    { status: 200 }
  );
}
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const body = await req.json();
  const { text } = body;
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  if (!comment) {
    return NextResponse.json(
      { message: `Comment with id: ${id} not found`, data: {} },
      { status: 404 }
    );
  }
  const data = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      text,
    },
  });
  return NextResponse.json(
    { data, message: `Comment with id: ${id} is updated successfully!` },
    { status: 200 }
  );
}

