# 🛒 Ecommerce Angular + Express

Proyecto de ecommerce moderno con arquitectura full-stack, diseñado para ser escalable, mantenible y fácil de deployar.

## 🏗️ Arquitectura del Proyecto

### Backend (Express.js + Node.js)

- **Framework**: Express.js con TypeScript
- **Base de datos**: MariaDB con Prisma ORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Contraseñas**: Hasheadas con bcrypt + UUID para identificadores únicos
- **Pool de conexiones**: Configurado para optimizar rendimiento
- **Migraciones**: Sistema automatizado con Prisma Migrate

### Frontend (Angular)

- **Framework**: Angular 17+ con arquitectura standalone
- **Estructura**: Modular y reutilizable
- **State Management**: Angular Signals + Services
- **UI**: Angular Material + componentes personalizados
- **Routing**: Lazy loading para optimización

### DevOps & Deployment

- **Containerización**: Docker + Docker Compose
- **Variables de entorno**: Configuración segura con .env
- **Reverse Proxy**: Nginx (opcional)
- **Base de datos**: MariaDB containerizada

## 🚀 Tecnologías Propuestas

### ✅ Stack Principal (Ya definido)

- **Backend**: Express.js + TypeScript + Prisma
- **Frontend**: Angular + Standalone Components
- **Base de datos**: MariaDB
- **Autenticación**: JWT + UUID + bcrypt
- **Containerización**: Docker
- **Subida de archivos**: Multer + almacenamiento seguro (PDFs, imágenes)
- **Sistema de correos**: Nodemailer + plantillas HTML
- **Pagos**: Integración con Stripe/PayPal para tarjetas

### 💡 Sugerencias Adicionales

#### Backend

- **Validación**: `joi` o `zod` para validación de schemas
- **Logging**: `winston` para logs estructurados
- **Rate Limiting**: `express-rate-limit` para protección
- **CORS**: Configuración robusta
- **Helmet**: Seguridad adicional para headers HTTP
- **Compression**: `compression` para optimizar respuestas
- **Testing**: Jest + Supertest para pruebas

#### 📁 Manejo de Archivos

- **Upload**: `multer` para manejo de archivos multipart
- **Almacenamiento**: Local storage + AWS S3/MinIO para producción
- **Validación**: Tipos de archivo, tamaños máximos
- **Seguridad**: Escaneo de malware, sanitización de nombres
- **Optimización**: Compresión automática de imágenes con `sharp`
- **Thumbnails**: Generación automática para imágenes

#### 📧 Sistema de Correos

- **Provider**: `nodemailer` con SMTP/Gmail/SendGrid
- **Plantillas**: `handlebars` o `ejs` para emails HTML
- **Colas**: `bull` o `agenda` para envíos asíncronos
- **Tipos**: Confirmación, facturas, notificaciones, marketing
- **Tracking**: Confirmaciones de lectura y clicks

#### 💳 Sistema de Pagos

- **Gateways**: Stripe (principal) + PayPal (alternativo)
- **Métodos**: Tarjetas de crédito/débito, wallets digitales
- **Seguridad**: PCI DSS compliance, tokenización
- **Webhooks**: Manejo de eventos de pago
- **Monedas**: Soporte multi-moneda
- **Facturas**: Generación automática de PDFs

#### Frontend

- **HTTP Client**: Interceptors para manejo de tokens y errores
- **Forms**: Reactive Forms con validaciones personalizadas
- **PWA**: Service Workers para funcionalidad offline
- **Lazy Loading**: Para optimización de carga
- **Testing**: Jasmine + Karma + Cypress para E2E

#### Base de Datos & Migraciones

- **Migraciones**: Sistema automatizado con Prisma Migrate
- **Seeders**: Datos de prueba con TypeScript
- **Studio**: Interfaz visual para explorar datos
- **Backup**: Scripts automatizados
- **Indices**: Optimización automática de consultas

#### Seguridad

- **Variables de entorno**: Diferentes para dev/prod/test
- **Secrets**: Docker secrets para datos sensibles
- **HTTPS**: Certificados SSL/TLS
- **Input sanitization**: Prevención de inyecciones

## 📁 Estructura de Archivos Propuesta

```
ecommerce-angular-express/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuraciones (DB, JWT, etc.)
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── middleware/      # Middlewares personalizados
│   │   ├── models/          # Modelos de Sequelize
│   │   ├── routes/          # Definición de rutas
│   │   ├── services/        # Lógica de negocio
│   │   ├── utils/           # Utilidades y helpers
│   │   ├── validators/      # Schemas de validación
│   │   ├── uploads/         # Manejo de archivos subidos
│   │   ├── email/           # Plantillas y servicios de correo
│   │   ├── payments/        # Integración de pagos
│   │   └── app.ts          # Configuración principal
│   ├── migrations/          # Migraciones de BD
│   ├── seeders/            # Datos de prueba
│   ├── tests/              # Pruebas unitarias
│   ├── .env.example        # Ejemplo de variables
│   ├── .env.test           # Variables para testing
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Servicios principales
│   │   │   ├── shared/      # Componentes reutilizables
│   │   │   ├── features/    # Módulos de funcionalidades
│   │   │   ├── layouts/     # Layouts de aplicación
│   │   │   └── guards/      # Guards de rutas
│   │   ├── assets/          # Recursos estáticos
│   │   └── environments/    # Configuraciones por entorno
│   ├── Dockerfile
│   ├── package.json
│   └── angular.json
├── docker/
│   ├── nginx/              # Configuración de Nginx
│   └── mariadb/           # Scripts de inicialización
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .env.development
├── .env.testing
└── README.md
```

## 🗄️ Sistema de Migraciones con Prisma

Hemos implementado **Prisma** con funcionalidades modernas y type-safe:

### ✅ **Características implementadas:**

- **Schema declarativo**: Definición en `prisma/schema.prisma`
- **TypeScript nativo**: Tipos generados automáticamente
- **Migraciones automáticas**: Control de versiones con Prisma Migrate
- **Studio visual**: Interfaz para explorar datos
- **Seeders TypeScript**: Datos de prueba con tipos seguros
- **Relaciones automáticas**: Sin código manual de foreign keys

### 🛠️ **Comandos disponibles:**

```bash
# Migraciones
npm run db:migrate              # Crear y aplicar migraciones
npm run db:migrate:deploy       # Aplicar migraciones en producción
npm run db:migrate:reset        # Resetear base de datos
npm run db:push                 # Push directo del schema

# Seeders
npm run db:seed                 # Ejecutar seeder TypeScript

# Herramientas
npm run db:generate             # Regenerar cliente Prisma
npm run db:studio               # Abrir interfaz visual

# Comandos directos de Prisma
npx prisma migrate dev          # Desarrollo
npx prisma migrate deploy       # Producción
npx prisma migrate reset        #Resetear base de datos
npx prisma db push             # Push directo
npx prisma studio              # Interfaz visual
npx prisma db seed              #Ejecutar seeder
```

### 📊 **Modelos definidos:**

- **`User`**: Usuarios con autenticación JWT + bcrypt
- **`Product`**: Productos del ecommerce con JSON fields
- **`Order`**: Pedidos con relaciones automáticas
- **`OrderItem`**: Items de pedidos

### 🧪 **Datos de prueba incluidos:**

- **3 usuarios**: admin, user, test (password: `password123`)
- **5 productos**: iPhone, MacBook, Samsung, Sony, Nike

## 🔐 Configuración de Seguridad

### Variables de Entorno (.env)

```env
# Base de datos
DB_HOST=mariadb
DB_PORT=3306
DB_NAME=ecommerce_db
DB_USER=ecommerce_user
DB_PASSWORD=secure_password_here

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# App
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Otros
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_here

# Archivos
UPLOAD_PATH=/uploads
MAX_FILE_SIZE=10485760
ALLOWED_IMAGES=jpg,jpeg,png,gif,webp
ALLOWED_DOCUMENTS=pdf,doc,docx

# Correos
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Tu Ecommerce

# Pagos
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
WEBHOOK_SECRET=your_webhook_secret
```

### Docker con Variables Seguras

- Uso de Docker secrets para producción
- Variables de entorno separadas por ambiente
- Configuración de red interna para servicios

## 🚦 Próximos Pasos

### Fase 1: Base del Sistema

1. **Configuración inicial del backend**: Express + TypeScript + Prisma
2. **Configuración de base de datos**: MariaDB + migraciones automáticas
3. **Sistema de autenticación**: JWT + middleware de validación
4. **API REST básica**: CRUD para productos/usuarios

### Fase 2: Funcionalidades Avanzadas

5. **Sistema de archivos**: Upload de imágenes y PDFs con Multer
6. **Sistema de correos**: Nodemailer + plantillas para notificaciones
7. **Integración de pagos**: Stripe para procesamiento de tarjetas
8. **Frontend Angular**: Estructura modular + componentes standalone

### Fase 3: Deployment y Optimización

9. **Dockerización**: Contenedores para todos los servicios
10. **Testing**: Configuración de pruebas unitarias e integración
11. **Optimización**: Caching, compresión, CDN para archivos
12. **Seguridad**: Auditoría de seguridad y hardening

## 🛠️ Tecnologías Específicas por Funcionalidad

### 📁 **Subida de Archivos**

```bash
# Dependencias principales
npm install multer sharp helmet express-fileupload
npm install @types/multer --save-dev

# Para almacenamiento en la nube (opcional)
npm install aws-sdk @aws-sdk/client-s3
```

### 📧 **Sistema de Correos**

```bash
# Dependencias principales
npm install nodemailer handlebars bull agenda
npm install @types/nodemailer --save-dev

# Para plantillas avanzadas
npm install mjml ejs
```

### 💳 **Sistema de Pagos**

```bash
# Stripe (principal)
npm install stripe

# PayPal (alternativo)
npm install @paypal/checkout-server-sdk

# Para generar facturas PDF
npm install puppeteer pdfkit
```

## 🎯 Ventajas de Prisma vs Sequelize

### ✅ **Prisma (Actual)**

- **Schema declarativo**: Un solo archivo `schema.prisma`
- **TypeScript nativo**: Tipos generados automáticamente
- **Relaciones automáticas**: Sin código manual de foreign keys
- **Studio visual**: Interfaz para explorar datos
- **Migraciones simples**: `npx prisma migrate dev`
- **No sequelize-auto**: Generación automática de tipos

### ❌ **Sequelize (Anterior)**

- **Modelos manuales**: Archivos separados para cada modelo
- **Validaciones manuales**: Código repetitivo en cada modelo
- **Relaciones complejas**: Código manual para foreign keys
- **sequelize-auto**: Herramienta externa para generar modelos
- **Migraciones complejas**: Comandos más verbosos

## ❓ ¿Hay algo que quieras modificar o agregar?

Tu propuesta inicial es excelente. Las tecnologías que has elegido son modernas y forman un stack sólido. ¿Te parece bien esta estructura? ¿Hay alguna funcionalidad específica del ecommerce que quieras priorizar?
