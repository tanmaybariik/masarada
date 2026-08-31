import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const adminEmail = "karunamoyeemasarada@gmail.com";
    const devoteeEmail = "devotee@masarada.com";

    // 1. Seed or update Admin
    const adminExists = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    const adminHash = await bcrypt.hash("admin123456", 10);

    if (!adminExists) {
      await prisma.user.create({
        data: {
          name: "শ্রী অর্ণব ভক্ত (Admin)",
          email: adminEmail,
          password: adminHash,
          phone: "+91 8918501779",
          role: "SUPER_ADMIN",
          image: "/arnab-profile.jpg",
        },
      });
    } else if (!adminExists.password || adminExists.role !== "SUPER_ADMIN") {
      await prisma.user.update({
        where: { email: adminEmail },
        data: {
          password: adminHash,
          role: "SUPER_ADMIN",
        },
      });
    }

    // 2. Seed Devotee
    const devoteeExists = await prisma.user.findUnique({
      where: { email: devoteeEmail },
    });

    if (!devoteeExists) {
      const userHash = await bcrypt.hash("user123456", 10);
      await prisma.user.create({
        data: {
          name: "সুমন ব্যানার্জী / Suman Banerjee",
          email: devoteeEmail,
          password: userHash,
          phone: "+91 9830123456",
          role: "USER",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Admin & Demo accounts initialized successfully",
      accounts: [
        { email: adminEmail, role: "SUPER_ADMIN", pass: "admin123456" },
        { email: devoteeEmail, role: "USER", pass: "user123456" },
      ],
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed default accounts", details: error.message },
      { status: 500 }
    );
  }
}
