<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Ejecución para el Proyecto Backend en NestJs
Instalar Dependencias
```bash
npm install
```

El .env no se excluyó del proyecto para mayor facilidad.

BASE DE DATOS POSTGRESQL
-- Importar la Base de Datos, desde el archivo llamado task_bd.sql
-- Si no se importa, solo basta con crear una Base de Datos con el nombre task_bd (Al arrancar el proyecto se cosntruiran las tablas)

Inciar Servidor
```bash
npm run start:dev
# o
npm start
```

SEEDER (Llena las tablas con los ROlES y un ADMIN para iniciar sesión)
-- Correr migracion despúes de tener la BD creada y haber corrido el proyecto.
```bash
npm run seed
```

CREDENCIALES - INCIAR SESION
 -- Correo
 admin@gmail.com

 -- Contraseña
 12345Aa


