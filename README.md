# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/233766bc-08fb-4ecb-bc56-c8454a403561

## Documentación Técnica

### Lenguajes y Tecnologías
- **TypeScript/React**: Framework principal para el desarrollo frontend
- **Electron**: Framework para aplicaciones de escritorio
- **MongoDB**: Base de datos NoSQL local
- **FastAPI**: Backend en Python
- **Tailwind CSS**: Framework de estilos
- **Shadcn/ui**: Biblioteca de componentes UI

### Estructura del Sistema

#### Base de Datos
- **MongoDB Local**:
  - Ubicación: C:/mdigital/
  - Base de datos: mantenimientodigital
  - Colecciones principales:
    - otrabajo
    - por_tipo_de_activo
    - por_funcionalidad
    - por_importancia_critica
    - por_ubicacion
    - por_modo_de_mantenimiento_aplicable
    - por_ciclo_de_vida_del_activo

- **PythonAnywhere**:
  - Archivos JSON:
    - /home/oaf/mantenimiento/usuarios/usuarios.json
    - /home/oaf/mantenimiento/datos/empresas.json

### Componentes Principales

#### Dashboard (src/pages/Index.tsx)
- **Funcionalidad**: Página principal que muestra:
  - Tarjeta de fecha/hora en tiempo real
  - Estadísticas generales
  - Lista de órdenes de trabajo pendientes
  - Gráficos estadísticos
  - Alertas del sistema

#### Configuración (src/pages/Setup.tsx)
- **Funcionalidad**: Configuración inicial del sistema
  - Datos de la empresa
  - Configuraciones generales

#### Configuración de Datos (src/pages/DataSetup.tsx)
- **Funcionalidad**: Configuración de almacenamiento
  - Gestión de datos
  - Configuración de archivos

#### Configuración de Tablas (src/pages/TablesSetup.tsx)
- **Funcionalidad**: 
  - Inicialización de la base de datos MongoDB
  - Creación automática de colecciones
  - Gestión de clasificación de activos

## Cómo ejecutar el proyecto

1. **Requisitos previos**:
   - Node.js y npm instalados
   - MongoDB instalado localmente
   - Python con FastAPI para el backend

2. **Instalación**:
```sh
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run electron:dev

# Construir la aplicación
npm run electron:build
```

## Configuración Inicial

1. Configurar datos de la empresa en la sección "Configuración"
2. Inicializar la base de datos desde "Configuración de Tablas"
3. Verificar la creación correcta de las colecciones en MongoDB

Para más información, visita la [documentación oficial](https://docs.lovable.dev/).