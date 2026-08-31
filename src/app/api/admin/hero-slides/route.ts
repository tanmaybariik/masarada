import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const user = (session as any)?.user;
    
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: "asc" }
    });

    return NextResponse.json(slides);
  } catch (error: any) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const user = (session as any)?.user;
    
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { image, position, order } = body;

    const newSlide = await prisma.heroSlide.create({
      data: {
        image,
        position: position || "object-top",
        order: order || 0
      }
    });

    return NextResponse.json(newSlide);
  } catch (error: any) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const user = (session as any)?.user;
    
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, image, position, order } = body;

    const updatedSlide = await prisma.heroSlide.update({
      where: { id },
      data: {
        image,
        position,
        order
      }
    });

    return NextResponse.json(updatedSlide);
  } catch (error: any) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const user = (session as any)?.user;
    
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    await prisma.heroSlide.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
