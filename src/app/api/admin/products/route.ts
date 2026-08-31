export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
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
    const product = await prisma.product.create({
      data: {
        name: data.name,
        nameEn: data.nameEn,
        originalPrice: Number(data.originalPrice),
        price: Number(data.price),
        category: data.category,
        categoryName: data.categoryName,
        image: data.image,
        inStock: data.inStock,
        rating: Number(data.rating || 5.0),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
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
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        nameEn: data.nameEn,
        originalPrice: Number(data.originalPrice),
        price: Number(data.price),
        category: data.category,
        categoryName: data.categoryName,
        image: data.image,
        inStock: data.inStock,
        rating: Number(data.rating || 5.0),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
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

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
