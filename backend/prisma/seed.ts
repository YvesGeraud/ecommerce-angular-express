/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Crear usuarios
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || "12");
  const hashedPassword = await bcrypt.hash("password123", saltRounds);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@ecommerce.com" },
    update: {},
    create: {
      id: 1,
      email: "admin@ecommerce.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isActive: true,
      emailVerified: true,
    },
  });

  const regularUser = await prisma.user.upsert({
    where: { email: "user@ecommerce.com" },
    update: {},
    create: {
      id: 2,
      email: "user@ecommerce.com",
      password: hashedPassword,
      firstName: "Regular",
      lastName: "User",
      role: "USER",
      isActive: true,
      emailVerified: true,
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: "test@ecommerce.com" },
    update: {},
    create: {
      id: 3,
      email: "test@ecommerce.com",
      password: hashedPassword,
      firstName: "Test",
      lastName: "User",
      role: "USER",
      isActive: true,
      emailVerified: false,
    },
  });

  // Crear productos
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: "IPHONE-15-PRO-001" },
      update: {},
      create: {
        id: 1,
        name: "iPhone 15 Pro",
        description:
          "El último iPhone con características avanzadas de cámara y rendimiento excepcional.",
        price: 999.99,
        stock: 50,
        sku: "IPHONE-15-PRO-001",
        category: "Electrónicos",
        brand: "Apple",
        images: ["iphone15pro-1.jpg", "iphone15pro-2.jpg"],
        isActive: true,
        isFeatured: true,
        weight: 187.0,
        dimensions: { length: 159.9, width: 76.7, height: 8.25 },
        tags: ["smartphone", "apple", "5g", "camera"],
      },
    }),

    prisma.product.upsert({
      where: { sku: "MACBOOK-AIR-M2-001" },
      update: {},
      create: {
        id: 2,
        name: "MacBook Air M2",
        description:
          "Laptop ultraligera con chip M2 para máxima eficiencia y rendimiento.",
        price: 1199.99,
        stock: 30,
        sku: "MACBOOK-AIR-M2-001",
        category: "Computadoras",
        brand: "Apple",
        images: ["macbook-air-m2-1.jpg", "macbook-air-m2-2.jpg"],
        isActive: true,
        isFeatured: true,
        weight: 1250.0,
        dimensions: { length: 304.1, width: 215.0, height: 11.3 },
        tags: ["laptop", "apple", "m2", "ultralight"],
      },
    }),

    prisma.product.upsert({
      where: { sku: "SAMSUNG-S24-001" },
      update: {},
      create: {
        id: 3,
        name: "Samsung Galaxy S24",
        description: "Flagship Android con IA integrada y cámara profesional.",
        price: 899.99,
        stock: 40,
        sku: "SAMSUNG-S24-001",
        category: "Electrónicos",
        brand: "Samsung",
        images: ["samsung-s24-1.jpg", "samsung-s24-2.jpg"],
        isActive: true,
        isFeatured: false,
        weight: 167.0,
        dimensions: { length: 147.0, width: 70.6, height: 7.6 },
        tags: ["smartphone", "android", "samsung", "ai"],
      },
    }),

    prisma.product.upsert({
      where: { sku: "SONY-WH1000XM5-001" },
      update: {},
      create: {
        id: 4,
        name: "Sony WH-1000XM5",
        description:
          "Auriculares inalámbricos con cancelación de ruido líder en la industria.",
        price: 349.99,
        stock: 25,
        sku: "SONY-WH1000XM5-001",
        category: "Audio",
        brand: "Sony",
        images: ["sony-wh1000xm5-1.jpg", "sony-wh1000xm5-2.jpg"],
        isActive: true,
        isFeatured: false,
        weight: 250.0,
        dimensions: { length: 167.0, width: 185.0, height: 71.0 },
        tags: ["headphones", "wireless", "noise-cancelling", "sony"],
      },
    }),

    prisma.product.upsert({
      where: { sku: "NIKE-AIRMAX-270-001" },
      update: {},
      create: {
        id: 5,
        name: "Nike Air Max 270",
        description:
          "Zapatillas deportivas con tecnología Air Max para máxima comodidad.",
        price: 129.99,
        stock: 100,
        sku: "NIKE-AIRMAX-270-001",
        category: "Calzado",
        brand: "Nike",
        images: ["nike-airmax-270-1.jpg", "nike-airmax-270-2.jpg"],
        isActive: true,
        isFeatured: false,
        weight: 320.0,
        dimensions: { length: 28.0, width: 10.0, height: 12.0 },
        tags: ["shoes", "sports", "nike", "airmax"],
      },
    }),
  ]);

  console.log("✅ Seed completado exitosamente!");
  console.log(
    `👥 Usuarios creados: ${adminUser.email}, ${regularUser.email}, ${testUser.email}`
  );
  console.log(`📦 Productos creados: ${products.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
