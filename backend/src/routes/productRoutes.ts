import { Router } from "express";
import { ProductController } from "../controllers/productController";
import {
  validateBody,
  validateQuery,
  validateParams,
} from "../middleware/validation";
import {
  createProductSchema,
  updateProductSchema,
  updateStockSchema,
  productFiltersSchema,
  paginationSchema,
} from "../validators/productSchemas";
import { z } from "zod";

const router = Router();
const productController = new ProductController();

// Schema para validar SKU en parámetros
const skuParamSchema = z.object({
  sku: z.string().min(1, "SKU es requerido"),
});

// Schema para validar categoría en parámetros
const categoryParamSchema = z.object({
  category: z.string().min(1, "Categoría es requerida"),
});

// Schema para verificar stock
const stockCheckSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  quantity: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
});

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto
 * @access  Private (Admin)
 */
router.post(
  "/",
  validateBody(createProductSchema),
  productController.createProduct.bind(productController)
);

/**
 * @route   GET /api/products/featured
 * @desc    Obtener productos destacados
 * @access  Public
 */
router.get(
  "/featured",
  productController.getFeaturedProducts.bind(productController)
);

/**
 * @route   GET /api/products/categories
 * @desc    Obtener categorías únicas
 * @access  Public
 */
router.get(
  "/categories",
  productController.getCategories.bind(productController)
);

/**
 * @route   GET /api/products/brands
 * @desc    Obtener marcas únicas
 * @access  Public
 */
router.get("/brands", productController.getBrands.bind(productController));

/**
 * @route   GET /api/products/sku/:sku
 * @desc    Obtener producto por SKU
 * @access  Public
 */
router.get(
  "/sku/:sku",
  validateParams(skuParamSchema),
  productController.getProductBySku.bind(productController)
);

/**
 * @route   GET /api/products/category/:category
 * @desc    Obtener productos por categoría
 * @access  Public
 */
router.get(
  "/category/:category",
  validateParams(categoryParamSchema),
  validateQuery(paginationSchema),
  productController.getProductsByCategory.bind(productController)
);

/**
 * @route   GET /api/products/:id/stock/:quantity
 * @desc    Verificar disponibilidad de stock
 * @access  Public
 */
router.get(
  "/:id/stock/:quantity",
  validateParams(stockCheckSchema),
  productController.checkStock.bind(productController)
);

/**
 * @route   GET /api/products/:id
 * @desc    Obtener producto por ID
 * @access  Public
 */
router.get("/:id", productController.getProductById.bind(productController));

/**
 * @route   GET /api/products
 * @desc    Obtener productos con filtros y paginación
 * @access  Public
 */
router.get(
  "/",
  validateQuery(productFiltersSchema.merge(paginationSchema)),
  productController.getProducts.bind(productController)
);

/**
 * @route   PUT /api/products/:id
 * @desc    Actualizar producto
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  validateBody(updateProductSchema),
  productController.updateProduct.bind(productController)
);

/**
 * @route   PATCH /api/products/:id/stock
 * @desc    Actualizar stock de producto
 * @access  Private (Admin)
 */
router.patch(
  "/:id/stock",
  validateBody(updateStockSchema),
  productController.updateStock.bind(productController)
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Eliminar producto (soft delete)
 * @access  Private (Admin)
 */
router.delete("/:id", productController.deleteProduct.bind(productController));

export default router;
