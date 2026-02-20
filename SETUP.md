# Instrucciones de Instalación - Dashboard de Presupuesto

## ⚠️ Pasos Necesarios para Completar la Configuración

### 1. Instalar Dependencias

Si el proceso de instalación no se completó, ejecuta:

```bash
npm install recharts
```

### 2. Migrar la Base de Datos

Una vez instaladas las dependencias, ejecuta la migración de Prisma:

```bash
npx prisma migrate dev --name add_transactions
```

Si tienes problemas de conexión con la base de datos, asegúrate de:
- Que tu conexión a internet esté activa
- Que las credenciales en el archivo `.env` sean correctas
- Que tu instancia de Supabase esté activa

### 3. Generar el Cliente de Prisma

```bash
npx prisma generate
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

## 🎨 Mejoras Implementadas

### Nuevas Funcionalidades

1. **Dashboard Estadístico**
   - 6 tarjetas de estadísticas en tiempo real
   - Indicadores de presupuesto, gastos, disponible, ingresos y balance mensual

2. **Gráficos Interactivos**
   - Gráfico de barras: Comparación de presupuestado vs gastado por categoría
   - Gráfico circular: Distribución porcentual del presupuesto
   - Gráfico de líneas: Historial de transacciones (últimos 10 días)

3. **Sistema de Transacciones**
   - Registro de ingresos y gastos
   - Categorización de transacciones
   - Historial completo con fecha
   - Visualización diferenciada por tipo (ingresos en verde, gastos en rojo)

4. **Diseño Mejorado**
   - Layout tipo dashboard administrativo
   - Estilos modernos y consistentes
   - Mejor organización visual
   - Colores cohesivos con la paleta original

### Estructura del Dashboard

**Sección Izquierda (8 columnas)**:
- Resumen del presupuesto con división 50/30/20
- Gráficos de gastos por categoría
- Gráfico de distribución del presupuesto
- Historial de transacciones en línea de tiempo
- Tabla de gastos planificados

**Sección Derecha (4 columnas)**:
- Formulario de presupuesto mensual
- Formulario de nuevos gastos
- Formulario de transacciones
- Lista de transacciones recientes

## 🔧 Solución de Problemas

### Error: EPERM (Permisos)

Si ves errores de permisos al ejecutar comandos:

1. Cierra el servidor de desarrollo si está corriendo
2. Cierra VS Code
3. Abre VS Code con permisos de administrador
4. Vuelve a ejecutar los comandos

### Error: No puede conectarse a la base de datos

1. Verifica tu archivo `.env` tiene las credenciales correctas
2. Comprueba que tu conexión a internet esté activa
3. Verifica que Supabase esté funcionando

### Error: Cannot find module 'recharts'

Ejecuta de nuevo la instalación:

```bash
npm install recharts
```

## 📊 Modelo de Datos

Se agregó el modelo `Transaction` a Prisma:

```prisma
model Transaction {
  id          Int      @id @default(autoincrement())
  description String
  amount      Float
  type        String   // 'income' o 'expense'
  category    String
  date        DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🎯 Funcionalidades Mantenidas

- Sistema de presupuesto mensual (50/30/20)
- Gestión de gastos por categorías
- CRUD de items de presupuesto
- Colores originales (#834CFC morado, #BBFD1A verde lima)
- Formularios existentes
