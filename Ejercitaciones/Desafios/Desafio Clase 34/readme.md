# CoderHouse-Backend-32240-DesafioClase30
## Aplicación web de Ecommerce de productos.

### Para iniciar la aplicación

Descargar los paquetes de package.json y, sobre la carpeta del repositorio, ejecutar npm start.

Antes de ejecutar el comando, es necesario crear un archivo .env en el que deben detallarse: 
 - PORT (Por defecto 8080)
 - CONNECTION
 - BCRYPTGENSALT
 - JWTKEY
 - PERSISTENCE
 - MAILPASSWORD

### Informacion del proyecto

El proyecto cuenta con varias APIs, las cuales son 
 - session
 - carts
 - products
 - tickets
 - messages

Para acceder a cada una de ellas, la URL es /api/nombreApi/metodo

### Persistencias

El proyecto puede trabajar tanto con Mongo como con persistencia en archivos, esto se define en el PERSISTENCE del .env y utiliza el patrón Factory para alternar entre estos

### User Experience

La aplicación cuenta con varias secciones, incluyendo un chat para usuarios, un sistema de roles para la creación y modificación de archivos, usuarios con carritos autogenerados para cada usuario, sistema de compras con control y verificación de stock y motor de plantillas con handlebars

### Usuario administrador

El usuario administrador tiene como email coderUser@coderhouse.com y como contraseña coderPassword