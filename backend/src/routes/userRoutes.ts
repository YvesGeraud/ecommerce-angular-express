import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateBody, validateQuery } from "../middleware/validation";
import {
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
  loginSchema,
  userFiltersSchema,
  paginationSchema,
} from "../validators/userSchemas";

const router = Router();
const userController = new UserController();

/**
 * @route   POST /api/users
 * @desc    Crear un nuevo usuario
 * @access  Public (temporal - después agregar auth para admin)
 */
router.post(
  "/",
  validateBody(createUserSchema),
  userController.createUser.bind(userController)
);

/**
 * @route   GET /api/users/:id
 * @desc    Obtener usuario por ID
 * @access  Private
 */
router.get("/:id", userController.getUserById.bind(userController));

/**
 * @route   GET /api/users
 * @desc    Obtener usuarios con filtros y paginación
 * @access  Private (Admin)
 */
router.get(
  "/",
  validateQuery(userFiltersSchema.merge(paginationSchema)),
  userController.getUsers.bind(userController)
);

/**
 * @route   PUT /api/users/:id
 * @desc    Actualizar usuario
 * @access  Private
 */
router.put(
  "/:id",
  validateBody(updateUserSchema),
  userController.updateUser.bind(userController)
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Eliminar usuario (soft delete)
 * @access  Private (Admin)
 */
router.delete("/:id", userController.deleteUser.bind(userController));

/**
 * @route   POST /api/users/:id/change-password
 * @desc    Cambiar contraseña de usuario
 * @access  Private
 */
router.post(
  "/:id/change-password",
  validateBody(changePasswordSchema),
  userController.changePassword.bind(userController)
);

/**
 * @route   POST /api/users/verify-credentials
 * @desc    Verificar credenciales (login)
 * @access  Public
 */
router.post(
  "/verify-credentials",
  validateBody(loginSchema),
  userController.verifyCredentials.bind(userController)
);

export default router;
