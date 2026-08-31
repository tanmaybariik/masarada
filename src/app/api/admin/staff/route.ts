export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const staff = await prisma.staffMember.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, staff });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const staffMember = await prisma.staffMember.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        role: data.role,
        status: data.status,
        joinedDate: data.joinedDate || "Feb 2026",
      },
    });

    return NextResponse.json({ success: true, staffMember });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create staff member" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const staffMember = await prisma.staffMember.update({
      where: { id: data.id },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        role: data.role,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, staffMember });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update staff member" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

    await prisma.staffMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete staff member" },
      { status: 500 }
    );
  }
}
