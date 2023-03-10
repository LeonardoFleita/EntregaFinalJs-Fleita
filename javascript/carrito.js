import { imprimirCarrito, limpiarCarrito, agregarYQuitar } from "./functions/funcCarrito.js";
let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = JSON.parse(localStorage.getItem("productos"));

imprimirCarrito(carrito);
limpiarCarrito();
agregarYQuitar(productos, carrito);