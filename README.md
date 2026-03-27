# Chets Nuts Foods 

Sistema web creado con la finalidad de optimizar la gestión de guias de remisión de empresas, siempre y cuando cuentes con su propia flota de vehiculos.

## IMPLEMENTACIONES 

// emisión de GRE.
agregar dos botones "nuevo" y "habitual" al momento de registrar el remitente y el destinatario.

// Correción de productos en la GRE
Optimizar el apartado de agregar productos, eliminar los tipos que no están siendo utilizados.

// sub apartado para guardar la información de la empresa (UBICACIÓN)
Agregar formulario para guardar la provincia, departamento y distrito junto con una descripción exacta de la empresa
en el apartado de configuraciones.

// GENERACIÓN DE ARCHIVOS TIPO .PDF 
Después de haber rellenado los datos para emitir una GRE, se debe generar un pdf con opción a descargar.

// Correción de la gestión de productos
Eliminar el peso unitario y la unidad de peso de cada producto.


## Arquitectura del Sistema de Gestión de Guías de Remisión

Esta aplicación utiliza una arquitectura **Basada en Características (Features)**. El objetivo es mantener la lógica de negocio (Administrador, Trabajador, Chofer) desacoplada y facilitar la reutilización de componentes entre roles.

### Estructura de Directorios

```text
src/
├── api/                    # Configuración de Axios/Fetch y clientes API
│   ├── gre.api.ts                  # consume el endpoint de guias de remisión
│   ├── producto.api.ts             # consume el endpoint de productos
│   ├── transporte.api.ts           # consume el endpoint de transporte
│   ├── seguimiento.api.ts          # consume el endpoint de productos 
│   ├── usuario.api.ts              # consume el endpoint de información de usuario 
│   └── empleados.api.ts            # consume el endpoint de empleados
├── components/             # Componentes comunes (Layout, Navbar, Sidebar, UI)
│   ├── layout/
│   │   └── NavBar.tsx              # Barra de navegación
│   └── ui/                 # Botones, Inputs, Modales (Shared)
│       ├── EstadoGuia.tsx          # Estado de transporte ( Entregado, Enviad, Borrado )
│       ├── .tsx
│       ├── .tsx
│       ├── .tsx
│       └── .tsx
├── config/                 # Roles, permisos y constantes
│   └── roles.ts                    # Definición de tipos: 'ADMINISTRADOR' | 'TRABAJADOR' | 'CHOFER'
├── features/               # El núcleo del negocio
│   ├── auth/                       # Login y gestión de cuenta (Perfil del Trabajador)
│   │   ├── Perfil.tsx                      # Gestión de cuenta del usuario.
│   │   └── Login.tsx                       # Interfaz del login
│   ├── gre/             # CRUD de Guías, detalles y estados de transporte
│   │   ├── components/
│   │   │   ├── TableGre.tsx                 # Listar todas las guías de remisión
│   │   │   ├── DetallesGre.tsx              # Ver detalles de una guía de remisión
│   │   │   ├── FormCreateGre.tsx            # Formulario para crear nueva guía de remisión
│   │   │   ├── FormUpdateGre.tsx            # Formulario para actualizar una guía de remisión existente
│   │   │   └── FormDeleteGre.tsx            # Formulario para eliminar una guía de remisión existente
│   │   ├── hooks/
│   │   │   └── useGre.ts                    # Hook para manejar las guís de remisión
│   │   └── services/      
│   │       └── gre.service.ts               # Servicio para interactuar con el endpoint de guías de remisión
│   ├── productos/
│   │   ├── components/     
│   │   │   ├── TableProductos.tsx           # Listar todas las guias de remisión
│   │   │   ├── DetallesProducto.tsx         # Ver detalles de una guía de remisión
│   │   │   ├── FormCreateProducto.tsx       # Formulario para crear un nuevo producto
│   │   │   ├── FormUpdateProducto.tsx       # Formulario para actualizar la información de un producto existente
│   │   │   └── FormDeleteProducto.tsx       # Formulario para eliminar un producto existente
│   │   ├── hooks/
│   │   │   └── useProducto.ts               # Hook para manejar los productos
│   │   └── services/       
│   │       └── producto.service.ts          # Servicio para interactuar con el endpoint de productos
│   ├── transporte/           # Lógica de seguimiento (mapas o línea de tiempo)
│   │   ├── components/
│   │   │   ├── FormUpdateTransporte.tsx     # Formulario para actualizar el estado de transporte.
│   │   ├── hooks/
│   │   │   └── useTransporte.ts             # Hook para manejar la información del transporte    
│   │   └── services/      
│   │       └── transporte.service.ts        # Servicio para interactuar con el endpoint de transporte
│   ├── seguimiento/           # Seguimiento del transporte durante su recorrido
│   │   ├── components/
│   │   │   └── SeguimientoGre.tsx           # Visualizar el seguimiento de una carga
│   │   ├── hooks/
│   │   │   ├── useSeguimiento.ts            # Hook para manejar los datos del seguimiento
│   │   └── services/      
│   │       └── seguimiento.service.ts       # Servicio para interactuar con el endpoint de seguimiento
│   └── users/              # Gestión de permisos (solo para Admin)
│       ├── components/
│       │   ├── TableEmpleados.tsx           # Listar todos los empleados
│       │   ├── Permisos.tsx                 # Gestionar los permisos de un empleado
│       │   ├── DetallesEmpleado.tsx         # Visualizar la información completa de un empleado 
│       │   ├── FormCreateEmpleado.tsx       # Formulario para registrar nuevo empleado
│       │   ├── FormDeleteEmpleado.tsx       # Formulario para eliminar un empleado existente
│       │   └── FormUpdateEmpleado.tsx       # Formulario para actualizar la información de un empleado
│       ├── hooks/
│       │   ├── usePermisos.ts               # Hook para manejar los permisos
│       │   └── useEmpleado.ts               # Hook para manejar los empleados
│       └── services/      
│           ├── empleados.service.ts         # Servicio para interactuar con el endpoint de empleados
│           └── permisos.service.ts          # Servicio para interactuar con el endpoint de permisos
├── hooks/                  # Hooks globales (useAuth, useLocalStorage)
├── routes/                 # Configuración de React Router
│   ├── PrivateRoute.tsx            # Componente que valida sesión y ROL
│   └── AppRoutes.tsx       # Definición de rutas por rol
└── pages/                  # Vistas finales que ensamblan las features
    ├── administrador/      # DashboardAdmin, UserManagementPage
    │   ├── usuario.tsx             # Actualizar información de usuario
    │   ├── estadisticas.tsx        # Graficos, Resumen y Ventas
    │   ├── lista-gre.tsx           # Listar guías de remisión, ver detalles.
    │   ├── trabajadores.tsx        # Registrar nuevo trabajador, inhabilitar y crear cuenta de acceso.
    │   ├── productos.tsx           # Gestionar stock y CRUD producto. 
    │   └── seguimiento.tsx         # Seguimiento del transporte
    ├── trabajador/         # DashboardWorker, CreateGuidePage
    │   ├── usuario.tsx             # Actualizar información de usuario
    │   ├── lista-gre.tsx           # Listar guías de remisión, ver detalles, modificar y dar de baja
    │   ├── crear-gre.tsx           # Registrar nueva guía de remisión
    │   └── seguimiento.tsx         # Seguimiento del transporte 
    └── chofer/             # DriverTaskPage, UpdateDeliveryPage
        ├── usuario.tsx             # Actualizar información de usuario
        ├── transporte.tsx          # Actualizar el estado de transporte
        └── gre.tsx                 # Visualizar detalles de la guia de remisión asociado a su transporte
```
