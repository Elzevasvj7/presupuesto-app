# 💰 Dashboard de Presupuesto - Aplicación Mejorada

## 🚀 Descripción

Aplicación web completa para gestión de presupuestos personales con dashboard administrativo, gráficos interactivos y sistema de transacciones.

## ✨ Nuevas Funcionalidades Agregadas

### 📊 Dashboard Administrativo
- **Header Moderno**: Con fecha actual y avatar de usuario
- **Tarjetas de Estadísticas**: 6 indicadores en tiempo real
  - Presupuesto Total
  - Gastos Planificados
  - Disponible
  - Ingresos del Mes
  - Gastos del Mes
  - Balance Mensual

### 📈 Gráficos Interactivos (Recharts)
1. **Gráfico de Barras**: Comparación de presupuestado vs gastado por categoría
2. **Gráfico Circular**: Distribución porcentual del presupuesto
3. **Gráfico de Líneas**: Historial de transacciones (últimos 10 días)

### 💳 Sistema de Transacciones
- Registro de ingresos y gastos
- Categorización flexible
- Fechas personalizables
- Lista de transacciones recientes con colores diferenciados
- Eliminación rápida de transacciones

## 🔧 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Base de Datos

Asegúrate de tener un archivo `.env` con tu conexión a PostgreSQL/Supabase:

```env
DATABASE_URL="postgresql://..."
```

### 3. Ejecutar Migraciones

**Opción A - Script automático (Windows):**
```bash
setup-db.bat
```

**Opción B - Manual:**
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Iniciar Aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura Principal

```
src/
├── app/page.tsx              # Dashboard principal
├── components/
│   ├── DashboardHeader.tsx   # Header (NUEVO)
│   ├── DashboardStats.tsx    # Estadísticas (NUEVO)
│   ├── TransactionList.tsx   # Transacciones (NUEVO)
│   ├── charts/               # Gráficos (NUEVO)
│   └── form/                 # Formularios (MEJORADOS)
└── lib/actions.ts            # Server actions
```

## 🎨 Funcionalidades

- ✅ Sistema de presupuesto mensual (regla 50/30/20)
- ✅ Gestión de gastos por categorías
- ✅ Sistema completo de transacciones
- ✅ 3 tipos de gráficos interactivos
- ✅ Dashboard con 6 tarjetas de estadísticas
- ✅ Diseño moderno y responsive

## 🛠️ Tecnologías

- Next.js 15
- TypeScript
- Prisma + PostgreSQL
- Recharts (NUEVO)
- Tailwind CSS
- Ant Design

## 📝 Modelos de Base de Datos

### Transaction (NUEVO)
```prisma
model Transaction {
  id          Int      @id @default(autoincrement())
  description String
  amount      Float
  type        String   # income | expense
  category    String
  date        DateTime
}
```

## 🐛 Solución de Problemas

Ver el archivo **SETUP.md** para instrucciones detalladas de instalación y solución de problemas comunes.

---

**Desarrollado con ❤️ usando Next.js y TypeScript**

