export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const gallery = await prisma.galleryPhoto.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, gallery });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery photos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "karunamoyeemasarada@gmail.com")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const photo = await prisma.galleryPhoto.create({
      data: {
        name: data.name,
        enName: data.enName,
        category: data.category,
        categoryName: data.categoryName,
        url: data.url,
        quality: data.quality || "HD",
        dateAdded: data.dateAdded || "Feb 2026",
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create gallery photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "karunamoyeemasarada@gmail.com")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

    await prisma.galleryPhoto.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery photo" },
      { status: 500 }
    );
  }
}
