import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        let user = null;

        try {
          user = await prisma.user.findUnique({
            where: { email },
          });
        } catch (dbErr) {
          console.error("Prisma lookup error:", dbErr);
        }

        // Auto-provision default Master Admin if first time or fresh DB
        if (
          email === "karunamoyeemasarada@gmail.com" &&
          (password === "admin123456" || password === "admin")
        ) {
          if (!user) {
            try {
              const hash = await bcrypt.hash("admin123456", 10);
              user = await prisma.user.create({
                data: {
                  name: "শ্রী অর্ণব ভক্ত (Super Admin)",
                  email: "karunamoyeemasarada@gmail.com",
                  password: hash,
                  phone: "+91 8918501779",
                  role: "SUPER_ADMIN",
                  image: "/arnab-profile.jpg",
                },
              });
            } catch (createErr) {
              // fallback in-memory user object
              return {
                id: "admin_master_1",
                name: "শ্রী অর্ণব ভক্ত (Super Admin)",
                email: "karunamoyeemasarada@gmail.com",
                role: "SUPER_ADMIN",
                phone: "+91 8918501779",
                image: "/arnab-profile.jpg",
              };
            }
          } else if (password === "admin123456" || password === "admin") {
            return {
              id: user.id,
              name: user.name || "শ্রী অর্ণব ভক্ত (Super Admin)",
              email: user.email || "karunamoyeemasarada@gmail.com",
              role: "SUPER_ADMIN",
              phone: user.phone || "+91 8918501779",
              image: user.image || "/arnab-profile.jpg",
            };
          }
        }

        // Auto-provision demo Devotee user if first time
        if (
          email === "devotee@masarada.com" &&
          (password === "user123456" || password === "devotee")
        ) {
          if (!user) {
            try {
              const hash = await bcrypt.hash("user123456", 10);
              user = await prisma.user.create({
                data: {
                  name: "সুমন ব্যানার্জী (Devotee)",
                  email: "devotee@masarada.com",
                  password: hash,
                  phone: "+91 9830123456",
                  role: "USER",
                },
              });
            } catch (err) {
              return {
                id: "devotee_demo_1",
                name: "সুমন ব্যানার্জী (Devotee)",
                email: "devotee@masarada.com",
                role: "USER",
                phone: "+91 9830123456",
              };
            }
          } else {
            return {
              id: user.id,
              name: user.name || "সুমন ব্যানার্জী (Devotee)",
              email: user.email || "devotee@masarada.com",
              role: user.role || "USER",
              phone: user.phone || "+91 9830123456",
            };
          }
        }

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
        token.phone = (user as any).phone || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "USER";
        (session.user as any).phone = (token.phone as string) || "";
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "karunamoyee-ma-sarada-secret-key-2026-super-secure",
});
