import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "ইমেইল এবং পাসওয়ার্ড আবশ্যক / Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে / Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে / An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-promote default admin email if registering
    let userRole = role || "USER";
    if (
      normalizedEmail === "karunamoyeemasarada@gmail.com" ||
      normalizedEmail === "admin@masarada.com"
    ) {
      userRole = "SUPER_ADMIN";
    }

    const newUser = await prisma.user.create({
      data: {
        name: name ? String(name).trim() : null,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone ? String(phone).trim() : null,
        role: userRole,
      },
    });

    return NextResponse.json(
      {
        message: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে / Account created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে / Internal server error during registration" },
      { status: 500 }
    );
  }
}
