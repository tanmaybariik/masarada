import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: "asc" }
    });

    return NextResponse.json(slides);
  } catch (error: any) {
    console.error("Error fetching public hero slides:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
