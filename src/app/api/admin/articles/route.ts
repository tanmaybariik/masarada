export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const articles = await prisma.libraryArticle.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        sections: true,
      },
    });
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles" },
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
    const article = await prisma.libraryArticle.create({
      data: {
        titleBn: data.titleBn,
        titleEn: data.titleEn,
        subtitleBn: data.subtitleBn,
        subtitleEn: data.subtitleEn,
        authorBn: data.authorBn,
        authorEn: data.authorEn,
        category: data.category,
        categoryBn: data.categoryBn,
        categoryEn: data.categoryEn,
        readTimeBn: data.readTimeBn,
        readTimeEn: data.readTimeEn,
        image: data.image,
        featured: data.featured || false,
        highlightQuoteBn: data.highlightQuoteBn,
        highlightQuoteEn: data.highlightQuoteEn,
        wikiSource: data.wikiSource,
        sections: {
          create: data.sections || [],
        }
      },
      include: {
        sections: true,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create article" },
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
    
    // Simple approach: delete existing sections and recreate them
    await prisma.articleSection.deleteMany({
      where: { articleId: data.id }
    });

    const article = await prisma.libraryArticle.update({
      where: { id: data.id },
      data: {
        titleBn: data.titleBn,
        titleEn: data.titleEn,
        subtitleBn: data.subtitleBn,
        subtitleEn: data.subtitleEn,
        authorBn: data.authorBn,
        authorEn: data.authorEn,
        category: data.category,
        categoryBn: data.categoryBn,
        categoryEn: data.categoryEn,
        readTimeBn: data.readTimeBn,
        readTimeEn: data.readTimeEn,
        image: data.image,
        featured: data.featured || false,
        highlightQuoteBn: data.highlightQuoteBn,
        highlightQuoteEn: data.highlightQuoteEn,
        wikiSource: data.wikiSource,
        sections: {
          create: data.sections || [],
        }
      },
      include: {
        sections: true,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update article" },
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

    await prisma.libraryArticle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
