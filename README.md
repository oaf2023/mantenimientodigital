# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/233766bc-08fb-4ecb-bc56-c8454a403561

## Documentación Técnica

### Lenguajes y Tecnologías
- **TypeScript/React**: Framework principal para el desarrollo frontend
- **Tailwind CSS**: Framework de estilos
- **Shadcn/ui**: Biblioteca de componentes UI
- **React Query**: Gestión de estado y peticiones
- **React Router**: Manejo de rutas
- **Recharts**: Biblioteca para gráficos
- **date-fns**: Manipulación de fechas

### Componentes Principales

#### Dashboard (src/pages/Index.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Página principal que muestra:
  - Tarjeta de fecha/hora en tiempo real
  - Estadísticas generales
  - Lista de órdenes de trabajo pendientes
  - Gráficos estadísticos
  - Alertas del sistema

#### Órdenes de Trabajo (src/pages/work-orders/index.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Gestión de órdenes de trabajo
  - Formato de OT: "DDMMYYYY_HHMM_AREA_TAG"
  - Vista detallada de cada orden
  - Formulario de creación/edición

#### Configuración (src/pages/Setup.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Configuración inicial del sistema
  - Datos de la empresa
  - Configuraciones generales

#### Configuración de Datos (src/pages/DataSetup.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Configuración de almacenamiento
  - Gestión de datos
  - Configuración de archivos

#### Configuración de Tablas (src/pages/TablesSetup.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Gestión de clasificación de activos
  - Configuración de categorías
  - Gestión de tablas de activos

### Componentes Reutilizables

#### StatCard (src/components/dashboard/StatCard.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Tarjetas de estadísticas
  - Muestra métricas individuales
  - Iconos personalizables
  - Descripción detallada

#### TaskList (src/components/dashboard/TaskList.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Lista de tareas/órdenes
  - Muestra órdenes pendientes
  - Botón de ver detalles
  - Información resumida

#### StatisticsCard (src/components/dashboard/StatisticsCard.tsx)
- **Lenguaje**: TypeScript/React
- **Funcionalidad**: Gráficos estadísticos
  - Datos semanales
  - Datos mensuales
  - Visualización mediante gráficos

## Cómo editar este código

Hay varias formas de editar tu aplicación.

**Usar Lovable**

Simplemente visita el [Proyecto Lovable](https://lovable.dev/projects/233766bc-08fb-4ecb-bc56-c8454a403561) y comienza a hacer prompts.

Los cambios realizados a través de Lovable se confirmarán automáticamente en este repositorio.

**Usar tu IDE preferido**

Si deseas trabajar localmente usando tu propio IDE, puedes clonar este repositorio y enviar cambios. Los cambios enviados también se reflejarán en Lovable.

El único requisito es tener Node.js y npm instalados - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Sigue estos pasos:

```sh
# Paso 1: Clona el repositorio usando la URL Git del proyecto.
git clone <TU_URL_GIT>

# Paso 2: Navega al directorio del proyecto.
cd <NOMBRE_DE_TU_PROYECTO>

# Paso 3: Instala las dependencias necesarias.
npm i

# Paso 4: Inicia el servidor de desarrollo con recarga automática y vista previa instantánea.
npm run dev
```

## Tecnologías utilizadas en este proyecto

Este proyecto está construido con:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Cómo desplegar este proyecto

Simplemente abre [Lovable](https://lovable.dev/projects/233766bc-08fb-4ecb-bc56-c8454a403561) y haz clic en Compartir -> Publicar.

## ¿Puedo usar un dominio personalizado?

No admitimos dominios personalizados (aún). Si deseas implementar tu proyecto bajo tu propio dominio, te recomendamos usar Netlify. Visita nuestra documentación para más detalles: [Dominios personalizados](https://docs.lovable.dev/tips-tricks/custom-domain/)