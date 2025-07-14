const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@gmail.com';

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log(`❌ User with email ${email} already exists.`);
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin', 10); // ✅ Change this

  // Create the admin user
  await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log(`✅ Admin user created with email: ${email}`);
}

main()
  .catch((error) => {
    console.error('❌ Error creating admin user:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
