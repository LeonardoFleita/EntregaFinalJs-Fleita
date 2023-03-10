import {productos, imprimirProductos, agregarAlCarrito} from "./functions/funcProductos.js"
import {almacenar} from "./functions/funcCarrito.js"
let carrito = [];
let carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));

carritoEnStorage && (carrito = carritoEnStorage);
almacenar("productos", JSON.stringify(productos));
imprimirProductos(productos);
agregarAlCarrito(productos, carrito);



