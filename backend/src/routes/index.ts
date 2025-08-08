import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";

const router = Router();

// Montar las rutas con sus prefijos
router.use("/users", userRoutes);
router.use("/products", productRoutes);

// Ruta de salud para las APIs
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;
