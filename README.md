# Aurel — React E-commerce (Coderhouse)

Single Page Application de e-commerce desarrollada con React + React Router.  
Catálogo y detalle de productos consumidos desde Firebase Firestore.  
Carrito global con Context y checkout con generación de órdenes en Firestore.

## Tech Stack

- React (Vite)
- React Router
- Bootstrap 5
- Firebase (Firestore)

## Funcionalidades

- Catálogo de productos
- Filtrado por categorías
- Detalle por producto
- ItemCount con validaciones (mínimo 1, máximo stock)
- Carrito con Context (agregar, eliminar, vaciar, totales)
- Checkout con formulario
- Generación de orden en Firestore + visualización del Order ID
- Actualización de stock en Firestore al confirmar compra

## Rutas

- `/` Catálogo
- `/category/:categoryId` Categorías
- `/item/:itemId` Detalle
- `/cart` Carrito
- `/checkout` Checkout

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```
