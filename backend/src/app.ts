import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

// Configuración de variables de entorno
dotenv.config();

// Importaciones de configuración
import { PrismaClient } from "@prisma/client";
import apiRoutes from "./routes";

// Inicializar Prisma Client
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["warn", "error"],
});

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Middleware de CORS
const corsOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.CORS_ORIGINS_PROD?.split(",") || ["https://yourdomain.com"]
    : process.env.CORS_ORIGINS_DEV?.split(",") || [
        "http://localhost:4200",
        "http://localhost:3000",
      ];

console.log(`🌐 CORS configurado para: ${corsOrigins.join(", ")}`);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Middleware de compresión
app.use(compression());

// Middleware de logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Middleware para parsear JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas básicas
app.get("/", (req, res) => {
  res.json({
    message: "🛒 API de Ecommerce funcionando correctamente",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Ruta de health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "Connected",
    timestamp: new Date().toISOString(),
  });
});

// Rutas de la API
app.use("/api", apiRoutes);

// Ruta de prueba para verificar Prisma
app.get("/api/test", async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();

    res.json({
      message: "Prisma funcionando correctamente",
      users: userCount,
      products: productCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al conectar con la base de datos",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Middleware de manejo de errores
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Algo salió mal!",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error interno del servidor",
    });
  }
);

// Middleware para rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Entorno: ${process.env.NODE_ENV}`);
      console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

// Manejo de señales para cierre graceful
process.on("SIGTERM", async () => {
  console.log("SIGTERM recibido, cerrando servidor...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT recibido, cerrando servidor...");
  await prisma.$disconnect();
  process.exit(0);
});

// Iniciar servidor
startServer();

export default app;
