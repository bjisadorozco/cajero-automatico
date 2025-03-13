# Cajero Automático - Metodología del Acarreo

## Descripción del Proyecto

Este proyecto es un simulador de cajero automático desarrollado con React, Vite y Tailwind CSS, basado en la metodología del acarreo. Permite realizar tres tipos de retiros con diferentes validaciones y restricciones.

## Características Principales

## Retiros Disponibles:

### Retiro por número de celular (Estilo Nequi)

- Se ingresa un vector de 10 dígitos sin caracteres especiales ni alfabéticos.

- Se genera una clave temporal visible por 60 segundos.

- Se devuelve un vector de 11 dígitos (se agrega un 0 al inicio).

### Retiro estilo Ahorro a la Mano

- Se ingresa un vector de 11 dígitos comenzando con 0 o 1.

- El segundo dígito debe ser 3.

- Se ingresa una clave de 4 dígitos no visible en pantalla.

### Retiro por cuenta de ahorros

- Se ingresa un vector de 11 dígitos sin caracteres especiales ni alfabéticos.

- Se ingresa una clave de 4 dígitos no visible en pantalla.

### Opciones de Retiro:

- Retiros predefinidos en pantalla.

- Opcion de retiro libre (sin incluir billetes de $5,000).

- Restricción: si el monto ingresado es $145,000, el proceso se reinicia.

### Cálculo de Billetes:

Muestra en pantalla la cantidad de billetes según la metodología del acarreo.

### Predicción de Retiros Posibles:

Al finalizar, el sistema indica cuántos retiros adicionales se pueden realizar con los fondos disponibles.

### Tecnologías Utilizadas

* React - Biblioteca para la construcción de interfaces de usuario.

* Vite - Herramienta de desarrollo rápida para aplicaciones modernas de frontend.

* Tailwind CSS - Framework de CSS para diseños flexibles y rápidos.

## Estructura del Proyecto

node_modules/
public/
src/
  ├── assets/
  ├── components/
  │   ├── cajero-automatico.jsx
  │   ├── resultado-retiro.jsx
  │   ├── retiro-ahorro-mano.jsx
  │   ├── retiro-cuenta-ahorros.jsx
  │   ├── retiro-nequi.jsx
  │   ├── seleccion-monto.jsx
  ├── hooks/
  │   ├── use-toast.jsx
  ├── App.jsx
  ├── index.css
  ├── main.jsx
.gitignore
index.html
package.json
README.md
vite.config.js

## Instalación y Configuración

## Prerrequisitos

Asegúrate de tener instalado Node.js y npm.

Pasos de Instalación

1. Clona este repositorio:

git clone https://github.com/bjisadorozco/cajero-automatico.git

2. Ingresa al directorio del proyecto:

cd cajero-automatico

3. Instala las dependencias:

npm install

4. Inicia el servidor de desarrollo:

npm run dev

## Uso del Proyecto

1. Ejecuta la aplicación en el navegador.

2. Selecciona el tipo de retiro.

3. Ingresa los datos requeridos.

4. Escoge el monto a retirar.

5. Visualiza el resultado y los billetes entregados.

## Contribución

Si deseas contribuir:

* Realiza un fork del repositorio.

* Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).

* Realiza tus cambios y haz un commit (git commit -m 'Agrega nueva funcionalidad').

* Sube los cambios (git push origin feature-nueva-funcionalidad).

* Abre un pull request.
