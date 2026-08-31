process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "karunamoyeemasarada@gmail.com";
  const adminPass = "admin123456";
  const adminHash = bcrypt.hashSync(adminPass, 10);

  const devoteeEmail = "devotee@masarada.com";
  const devoteePass = "user123456";
  const devoteeHash = bcrypt.hashSync(devoteePass, 10);

  // Upsert Admin
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: adminHash,
      role: "SUPER_ADMIN",
      name: "শ্রী অর্ণব ভক্ত (Admin)",
      phone: "+91 8918501779"
    },
    create: {
      email: adminEmail,
      password: adminHash,
      role: "SUPER_ADMIN",
      name: "শ্রী অর্ণব ভক্ত (Admin)",
      phone: "+91 8918501779"
    }
  });

  // Upsert Devotee
  const devotee = await prisma.user.upsert({
    where: { email: devoteeEmail },
    update: {
      password: devoteeHash,
      role: "USER",
      name: "সুমন ব্যানার্জী (Devotee)",
      phone: "+91 9830123456"
    },
    create: {
      email: devoteeEmail,
      password: devoteeHash,
      role: "USER",
      name: "সুমন ব্যানার্জী (Devotee)",
      phone: "+91 9830123456"
    }
  });

  console.log("SUCCESS! Admin:", admin.email, "Password:", adminPass);
  console.log("SUCCESS! Devotee:", devotee.email, "Password:", devoteePass);
}

main().catch(console.error).finally(() => prisma.$disconnect());
