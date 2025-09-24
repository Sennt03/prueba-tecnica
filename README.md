# Prueba Técnica Angular V20

## Descripción del proyecto

Esta aplicación fue desarrollada con **Angular 20**, **Node.js v22.19.0** y **CSS puro**, cumpliendo con todos los requerimientos solicitados en la prueba.

Se han aplicado varias prácticas modernas de Angular y arquitectura limpia:

- **Angular 20 Signals + Zoneless**: Configurada sin `zone.js`, usando **signals** para la detección de cambios.
- **Test**: Incluye la configuracion y test unitarios de todos los componentes, servicios, y guards.
- **Proxy Angular**: Debido a limitaciones del backend (CORS), se utiliza un **proxy de Angular** (`frontend/proxy-conf.json` y configurado en `angular.json`) para redirigir las peticiones.
- **Short Imports**: Configuración en `tsconfig.json` para importar con alias (`@services/...`) en lugar de rutas relativas largas. 
- **Formulario reactivos**:
  - Uso de **ReactiveFormsModule** para validaciones asincronas, grupales y personalizadas en el formulario de creación de producto.
- **Arquitectura por features**:
  - `features/` → Módulo principal `products`  
  - `core/` → Servicios, modelos y lógica central  
  - `shared/` → Componentes reutilizables, guards y utilidades.  
- **Utilidades y componentes reutilizables**:
  - `shared/utils/alerts.ts` → Pequeña "libreria" de alertas para hacer el proyecto 100% puro HTML y Css sin librerias  
  - `shared/utils/myValidators.ts` → Utilidades para validaciones de formularios reactivos.
- **Tipado estricto en servicios**:  
  - Todos los modelos (`core/models`) tipan las peticiones y respuestas, asegurando autocompletado y seguridad en tiempo de desarrollo.
- **Lazy Loading**: Configuración de módulos bajo demanda para mejorar rendimiento (Junto con estrategia de precarga).
- **UI/UX**: Diseño simple, limpio y funcional, con enfoque en responsividad y usabilidad.  

La entrega incluye un **Dockerfile unificado**, que levanta tanto el backend como el frontend en un solo contenedor, simplificando la ejecución.

--

Repositorio con dos carpetas principales:
- `frontend/` — aplicación Angular
- `repo-interview-main/` — backend proporcionado Node.js

# Clonar repositorio
```
git clone https://github.com/Sennt03/prueba-tecnica.git
cd prueba-tecnica
```

## Levantar todo con Docker Compose (asegurate de tener docker corriendo)
Desde la raíz del repo (tras clonar):
```
docker-compose up --build
```

Esto construye la imagen usando el Dockerfile de la raíz y levanta el contenedor que ejecuta backend y frontend en un mismo contenedor.

### Puertos por defecto
- Frontend: http://localhost:4200
- Backend:  http://localhost:3002

## (Otras opciones) Levantar con Docker - build + run
Si prefieres usar docker sin compose:

Construir imagen:
```
docker build -t angular-node-single .
```

Ejecutar contenedor:
```
docker run --rm -p 3002:3002 -p 4200:4200 --name angular_node_single angular-node-single
```

## Requisitos (para ejecutar manualmente)
- Angular CLI: si vas a ejecutar tests locales, se requiere Angular 20 instalado globalmente
- Node: versión 22+ (recomendado)

## Levantar manualmente (por si quieres trabajar localmente sin Docker)
Abrir dos terminales (uno para backend y otro para frontend):

Backend:
```
cd repo-interview-main
npm install
npm run start:dev
```

Frontend:
```
cd frontend
npm install
ng s
```

# Ejecutar tests del frontend
* Asegúrate de tener Node v22+ y Angular CLI 20 instalado globalmente. 
Luego:
```
cd frontend
npm install
ng test
```

# Notas adicionales
En un entorno productivo se recomienda compilar el frontend con ng build y servirlo con Nginx o desde el backend, en lugar de usar ng serve.