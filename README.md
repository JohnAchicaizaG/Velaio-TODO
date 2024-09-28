# Proyecto de Prueba Técnica



[Ver video explicativo en YouTube](https://youtu.be/DyvC6rx1t1Y)


## Descripción

Este proyecto es una aplicación web desarrollada en **Angular 16** que permite gestionar tareas y personas asociadas a ellas. Forma parte de una prueba técnica para evaluar las habilidades de desarrollo frontend utilizando Angular y TypeScript. La aplicación ofrece una interfaz intuitiva y funcional para la gestión eficiente de tareas, personas y habilidades.
[Pagina web desplegada](https://66f86cfda744c258299363a9--unrivaled-banoffee-387b69.netlify.app/)
## Funcionalidades

La aplicación implementa las siguientes funcionalidades clave:

1. **Crear tareas**: Los usuarios pueden crear nuevas tareas asignando un título y otros detalles relevantes.
2. **Listar tareas creadas**: Se muestra una lista de todas las tareas creadas en la aplicación.
3. **Marcar tareas como completadas**: Los usuarios pueden marcar una tarea como completada o pendiente.
4. **Filtrar tareas por estado**: Se ofrece la posibilidad de filtrar las tareas por su estado (completadas o pendientes).
5. **Asignar personas a las tareas**: Se pueden asignar personas a cada tarea, especificando sus nombres completos, edades y habilidades.
6. **Añadir y eliminar personas de las tareas**: A través de botones específicos, los usuarios pueden agregar o eliminar personas asociadas a cada tarea.
7. **Añadir y eliminar habilidades**: Los usuarios pueden gestionar las habilidades asociadas a cada persona, con la opción de añadir o eliminar habilidades según sea necesario.
8. **Formulario reactivo con validaciones**: La aplicación utiliza formularios reactivos para gestionar la creación de personas y tareas, con validaciones avanzadas que incluyen arreglos y arreglos anidados.
9. **Gestion del estado de la aplicacion por NGRX**: Se aplica el patron reduxx para gestionar el estado de la aplicación por medio de ngrx.
10. **Pruebas Unitarias**: se realizan pruebas unitarias para asegurar la calidad del código.

### Reglas de Validación

- **Nombre completo**: Es obligatorio, debe tener al menos 5 caracteres y no puede repetirse entre las personas asignadas a la misma tarea.
- **Edad**: Es obligatoria y debe ser mayor de 18 años.
- **Habilidades**: Cada persona debe tener al menos una habilidad asignada.

## Tecnologías Utilizadas

- **Angular 16**: Framework frontend basado en TypeScript para el desarrollo de aplicaciones web.
- **NGRRX**: Biblioteca de gestión de estado para aplicaciones Angular.
- **TypeScript**: Lenguaje de programación tipado que se compila a JavaScript, utilizado para mejorar la robustez del código.
- **Angular Material**: Conjunto de componentes UI que siguen las guías de diseño de Material Design.
- **TailwindCSS**: Framework CSS utilitario para crear interfaces de usuario responsivas y personalizadas de manera rápida.
- **Karma**: Herramienta de pruebas utilizada con Jasmine para la ejecución de tests unitarios.
- **Jasmine**: Framework de pruebas unitarias para JavaScript y Angular.

## Estructura del Proyecto

```javascript
src/
│
├── app/
│   ├── features/
│   │   ├── task/
│   │   │   ├── components/      # Carpeta que contiene los componentes relacionados con las tareas
│   │   │   │   ├── list-task/   # Componente para listar tareas
│   │   │   │   │   ├── list-task.component.ts     # Lógica del componente List Task
│   │   │   │   │   ├── list-task.component.html   # Plantilla del componente List Task
│   │   │   │   │   ├── list-task.component.spec.ts # Pruebas unitarias del List Task
│   │   │   │   ├── form-task/   # Componente para el formulario de tareas
│   │   │   │   │   ├── form-task.component.ts     # Lógica del componente Form Task
│   │   │   │   │   ├── form-task.component.html   # Plantilla del componente Form Task
│   │   │   │   │   ├── form-task.component.spec.ts # Pruebas unitarias del Form Task
│   ├── app.component.ts    # Componente raíz
│   ├── app.module.ts       # Módulo raíz del proyecto
│
├── shared/                 # Componentes compartidos
│   ├── components/
│   │   ├── footer/         # Componente Footer
│   │   │   ├── footer.component.ts     # Lógica del componente Footer
│   │   │   ├── footer.component.html   # Plantilla del componente Footer
│   │   │   ├── footer.component.spec.ts # Pruebas unitarias del Footer
│   │   ├── navbar/         # Componente Navbar
│   │   │   ├── navbar.component.ts     # Lógica del componente Navbar
│   │   │   ├── navbar.component.html   # Plantilla del componente Navbar
│   │   │   ├── navbar.component.spec.ts # Pruebas unitarias del Navbar
│
├── state/
│   │   ├── actions/        # Acciones de NGRX para gestionar el estado
│   │   ├── effects/        # Efectos para manejar la lógica de las acciones
│   │   ├── reducers/       # Reductores para actualizar el estado de la aplicación
│   │   ├── selectors/      # Selectores para extraer datos del estado de manera eficiente
│   │   ├── models/         # Modelos de datos relacionados con el estado
│   │   ├── state.service.ts # Servicio para manejar la lógica de estado
│
├── assets/                 # Recursos estáticos como imágenes y estilos

```


## Comandos

```bash
npm install          # Instala las dependencias del proyecto.
ng serve             # Inicia el servidor de desarrollo.
ng build             # Compila la aplicación para producción.
ng test              # Ejecuta las pruebas unitarias.
