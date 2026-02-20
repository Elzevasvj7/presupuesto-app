@echo off
echo ========================================
echo Script de Configuracion - Dashboard de Presupuesto
echo ========================================
echo.

echo Paso 1: Generando cliente de Prisma...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo Error al generar cliente de Prisma
    echo Intenta cerrar el servidor de desarrollo y vuelve a ejecutar este script
    pause
    exit /b 1
)

echo.
echo Paso 2: Ejecutando migraciones de base de datos...
call npx prisma migrate dev --name add_transactions
if %ERRORLEVEL% NEQ 0 (
    echo Error al ejecutar migraciones
    echo Asegurate de que:
    echo - Tu archivo .env tiene las credenciales correctas
    echo - Tu conexion a internet esta activa
    echo - Supabase esta funcionando
    pause
    exit /b 1
)

echo.
echo ========================================
echo Configuracion completada exitosamente!
echo ========================================
echo.
echo Ahora puedes ejecutar: npm run dev
echo.
pause
