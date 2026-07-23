# Arquitectura del proyecto Chets-Nuts-Foods-frontend

## 1. Visión general

Este proyecto es una aplicación frontend de React + TypeScript creada con Vite. La organización del código sigue una separación clara entre:

- `src/routes/`: enrutamiento y protección de rutas.
- `src/pages/`: pantallas principales de la aplicación.
- `src/components/`: elementos de interfaz reutilizables y layouts.
- `src/features/`: lógica por dominio funcional con sus hooks, servicios, componentes y tipos.
- `src/api/`: llamadas HTTP y contratos de API.
- `src/types/`: tipos TypeScript compartidos y contratos de datos.
- `src/context/`: estado global y providers.
- `src/config/`: utilidades de autorización y constantes.

## 2. Flujo de arranque

1. `src/main.tsx`
   - Punto de entrada.
   - Renderiza `AppRoutes` dentro de `StrictMode`.

2. `src/routes/AppRoutes.tsx`
   - Define el enrutamiento de la aplicación con `react-router-dom`.
   - Envuelve la app con `AuthProvider`.
   - Protege rutas privadas con `PrivateRoute`.

3. `src/context/AuthContext.tsx`
   - Define `AuthProvider` y `useAuth()`.
   - Controla `user`, `isAuthenticated`, `login()` y `logout()`.
   - Lee/escribe usuario en `localStorage`.

4. `src/routes/PrivateRoute.tsx`
   - Redirige a `/login` si no hay sesión.
   - Usa `useAuth()` para verificar `isAuthenticated`.

## 3. Estructura de rutas principales

- `/login` → `src/pages/Login.tsx`
- `/` → `src/pages/ListaGre.tsx` dentro de `MainLayout`
- `/productos` → `src/pages/Productos.tsx`
- `/seguimiento` → `src/pages/Seguimiento.tsx`
- `/configuraciones` → `src/pages/Configuraciones.tsx`
- `/guias` → `src/pages/ListaGre.tsx`
- `/trabajadores` → `src/pages/Trabajadores.tsx`
- `/vehiculos` → `src/pages/Vehiculos.tsx`
- `*` → `src/pages/NotFound.tsx`

La mayoría de rutas van dentro de `MainLayout` y están protegidas por `PrivateRoute`.

## 4. Layouts y componentes globales

- `src/components/layouts/MainLayout.tsx`
  - Contenedor principal de la UI.
  - Incluye elementos comunes como `NavBar`.

- `src/components/layouts/NavBar.tsx`
  - Menú y navegación.
  - Usa roles de usuario para mostrar opciones según permisos.

- `src/components/layouts/ContentPage.tsx`, `ContentPageFloating.tsx`, `ContentSectionProcess.tsx`
  - Organizan el contenido de las páginas.

- `src/components/ui/` contiene componentes reutilizables como botones, inputs y tabla.

## 5. Capa API

- `src/api/` concentra todas las funciones que llaman al backend.
- Cada archivo API suele importar tipos desde `src/types/`.

Ejemplos:
- `src/api/Auth.api.ts` importa `Credenciales` y `AuthResponse`.
- `src/api/Vehiculos.api.ts` importa `BodyResponseWithPagination` y tipos de vehículo.
- `src/api/Usuarios.api.ts` importa `BodyResponse` y tipos de usuario.

## 6. Estructura de `features`

Cada dominio funcional sigue una estructura similar:

- `components/`: UI específica del feature.
- `hooks/`: hooks de datos y lógica.
- `services/`: llamadas a API específicas.
- `types/`: tipos locales del feature.

### Ejemplos de features importantes

- `src/features/vehiculos/`
  - `types/vehiculo.type.ts`
  - `hooks/useFetchVehiculos.ts`, `useCreateVehiculo.ts`, `useUpdateVehiculo.ts`
  - `components/FormCreate.tsx`, `FormUpdate.tsx`
  - `services/vehiculo.service.ts`

- `src/features/empleados/`
  - `types/empleado.type.ts`, `empleadoZ.type.ts`
  - `hooks/useFetchEmpleados.ts`, `useCreateEmpleado.ts`, `useUpdateEmpleado.ts`
  - `services/empleado.service.ts`

- `src/features/gre/`
  - `types/gre.type.ts`
  - `hooks/useFetchGuiasRemision.ts`, `useEmitirGuiaRemision.ts`
  - `components/FormCreateGre.tsx`

## 7. Arquitectura de tipos en `src/types/`

### 7.1 Tipos base compartidos

- `src/types/constantes.type.ts`
  - `UserRole`: `ADMIN`, `CHOFER`, `CLIENTE`, `COLABORADOR`
  - `UserGender`: `MASCULINO` | `FEMENINO`
  - `UserType`: `NATURAL` | `JURIDICO`
  - `TipoEstablecimiento`, `TipoVehiculo`, `EstadoVehiculo`, `EstadoTransporte`

- `src/types/auth.type.ts`
  - `Credenciales`
  - `AuthResponse` (incluye `UserRole`)

- `src/types/bodyResponse.type.ts`
  - `BodyResponse<T>`
  - `PaginationInfo`
  - `BodyResponseWithPagination<T>`

### 7.2 Tipos de entidad compartidos

- `src/types/usuarios.type.ts`
  - `CreateUsuario`
  - `ResponseGetDni`
  - `ResponseGetAll`
  - Reusa `UserGender` y `UserType`

- `src/types/vehiculos.type.ts`
  - `ResponseGetAll`, `ResponseGetByID`, `ResponseGetAllChoferes`
  - `CreateVehiculo`, `UpdateVehiculo`, `ResponseCreate`, `ResponseUpdate`
  - Reusa `TipoVehiculo`, `EstadoVehiculo`, `UserRole`

- `src/types/establecimiento.type.ts`
  - `ResponseGetAll`, `ResponseGetByID`
  - `CreateEstablecimiento`, `UpdateEstablecimiento`
  - Reusa `TipoEstablecimiento`

- `src/types/salidaTransporte.type.ts`
  - `CreateSalidaTransporte`, `UpdateSalidaTransporte`
  - Reusa `EstadoTransporte`

- `src/types/datosEmpresa.type.ts`
  - `UpdateDatosEmpresa`

- `src/types/producto.type.ts`
  - Actualmente vacío en el repositorio.

## 8. Tipos de feature locales

Los features locales contienen tipos adicionales que son útiles solo para esa función.

### `src/features/vehiculos/types/vehiculo.type.ts`

- Define `marca`, `modelo`, `tipoVehiculo` como listas de opciones.
- Define `Vehiculo` base.
- Define modelos derivados: `ListarVehiculo`, `RegistrarVehiculo`, `EditarVehiculo`, `DetallesVehiculo`, `DetallesNumerados`.

### `src/features/gre/types/gre.type.ts`

- Define `simpleGreType` y `DetailedGreType` para guías de remisión.
- Define `EmitirGre` y `ModificarGre`.
- Reutiliza `RegistrarVehiculo` desde `src/features/vehiculos/types/vehiculo.type.ts`.

## 9. Patrones de importación de tipos

- Los tipos generales se importan desde `src/types/` con rutas relativas.
  - Ejemplo: `import type { Credenciales, AuthResponse } from '../types/auth.type';`

- Los tipos de feature se importan desde el propio feature.
  - Ejemplo: `import type { RegistrarVehiculo } from '../types/vehiculo.type';`

- En `src/config/constantes.ts` también se importan tipos de feature:
  - `import type { marca, modelo, tipoVehiculo } from "../features/vehiculos/types/vehiculo.type";`

## 10. Ejemplo de flujo de tipo completo

### Login / Auth

1. `src/pages/Login.tsx`
   - importa `Credenciales` y `UserRole`.
2. Envía datos a `src/api/Auth.api.ts`.
3. `src/api/Auth.api.ts` usa `BodyResponse<AuthResponse>` para tipar la respuesta.
4. `src/context/AuthContext.tsx` usa `AuthResponse` para almacenar el usuario.

### Vehículos

1. `src/features/vehiculos/components/FormCreate.tsx`
   - importa `RegistrarVehiculo`.
2. El hook `useCreateVehiculo.ts` usa ese tipo para solicitar creación.
3. `src/api/Vehiculos.api.ts` usa `CreateVehiculo` y `BodyResponseWithPagination<ResponseGetAll>`.
4. `src/features/vehiculos/types/vehiculo.type.ts` define la forma de los datos locales y de UI.

### Guías de remisión (`gre`)

1. `src/features/gre/components/FormCreateGre.tsx`
   - importa `EmitirGre`.
2. El servicio `src/features/gre/services/gre.service.ts` usa `EmitirGre`.
3. `src/features/gre/types/gre.type.ts` reutiliza tipos de vehículo para la sección de transporte.

## 11. Cómo ubicar tipos rápido

1. Si buscas tipos compartidos, empieza en `src/types/`.
2. Si el tipo pertenece a una función concreta, revisa `src/features/<feature>/types/`.
3. Para tipos de respuesta API, mira `src/api/<Entidad>.api.ts` y sigue las importaciones.
4. Para tipos de UI/formulario, abre el componente dentro de `src/features/<feature>/components/`.
5. Usa búsqueda de VS Code por `import type { ... } from '../types'` o por el nombre del tipo.

## 12. Notas importantes

- No hay alias de TypeScript para rutas: todas las importaciones son relativas.
- El estado global de autenticación se gestiona en `src/context/AuthContext.tsx`.
- Las rutas privadas se controlan en `src/routes/PrivateRoute.tsx`.
- `src/types/producto.type.ts` está presente pero vacío; su contenido debería completarse si se utiliza el feature de productos.
- `src/features/gre/types/gre.type.ts` es un buen ejemplo de reutilización de tipos entre features.
