const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "karunamoyeemasarada@gmail.com";
  const devoteeEmail = "devotee@masarada.com";

  // Check if they exist
  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (adminExists) {
    const adminHash = bcrypt.hashSync("admin123456", 10);
    await prisma.user.update({
      where: { email: adminEmail },
      data: { password: adminHash }
    });
    console.log("Admin password reset.");
  }

  const devoteeExists = await prisma.user.findUnique({ where: { email: devoteeEmail } });
  if (devoteeExists) {
    const devoteeHash = bcrypt.hashSync("user123456", 10);
    await prisma.user.update({
      where: { email: devoteeEmail },
      data: { password: devoteeHash }
    });
    console.log("Devotee password reset.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
