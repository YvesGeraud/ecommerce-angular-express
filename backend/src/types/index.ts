// Tipos para validación de entrada (DTOs)
export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "USER" | "ADMIN";
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  brand?: string;
  images?: string[];
  isFeatured?: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  tags?: string[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  sku?: string;
  category?: string;
  brand?: string;
  images?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  tags?: string[];
}

// Tipos para respuestas de API
export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  brand?: string;
  images?: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para paginación
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Tipos para filtros
export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  search?: string;
}

export interface UserFilters {
  role?: "USER" | "ADMIN";
  isActive?: boolean;
  emailVerified?: boolean;
  search?: string;
}
