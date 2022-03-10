# Prueba de concepto de creacion de docs en drive

Se crea un gDoc y se le da permisos para la pinada.

## Setup

Necesitas ir a la consola de devs de google y crear un proyecto, activar las apis de Drive y Docs, y luego crear credenciales para que el sistema se pueda autenticar (que se descargan como un json).

Después reemplazá en el codigo donde diga `new google.auth.GoogleAuth({ ... })`

## Como correrlo

`npm install` la primera vez.

Luego: `npm start`

## Como probarlo

Desde consola: `curl -X POST http://localhost:5000/doc`

Tras crear el doc, vas a ver un link en consola. Proba accederlo con tu cuenta de 10pines desde el navegador.