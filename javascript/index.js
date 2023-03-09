//ARRAYS

const productos = [];
let carrito = [];
const productosEnStorage = [];
let carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));


//CONSTRUCTORES

function producto(id, nombre, precio, descripcion){
    this.id = parseInt(id)
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.descripcion = descripcion;
    this.precioConIva = this.precio * 1.21;
};


//CREACION DE OBJETOS PARA LOS ARRAY

const redVelvet = productos.push(new producto(1, "Red velvet", 6500, "Torta de chocolate de color rojo brillante recubierta por capas de glaseado de queso cremoso"));
const tresChocolates = productos.push(new producto(2, "Tres chocolates", 5500, "Húmedo bizcochuelo de chocolate amargo, ganache de chocolate amargo y tropezones de avellanas en praline"));
const strawberry = productos.push(new producto(3, "Strawberry", 6500, "Bizcochuelo de vainilla y pistachos, crema de queso mascarpone, agua de azahar y frutillas frescas"));
const rogel = productos.push(new producto(4, "La Rogelia", 2500, "Clásica torta rogel argentina, finas capas de galleta crujiente y dulce de leche, cubierta en merengue quemado"));


//STORAGE DE PRODUCTOS

export const almacenar = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

for(const prod of productos){
    almacenar("producto " + prod.id, JSON.stringify(prod));
};

//IMPORTACIÓN DE MÓDULOS
import * as funcionesCarrito from "./modules/funcionesCarrito.js";
import * as funcionesProductos from "./modules/funcionesProductos.js"

//EJECUCIÓN

carritoEnStorage && (carrito = carritoEnStorage);
console.log(carrito);
funcionesProductos.recuperarDeStorage("producto", productosEnStorage);
funcionesProductos.imprimirProductos(productosEnStorage);
funcionesCarrito.agregarAlCarrito(productosEnStorage, carrito);
funcionesCarrito.limpiarCarrito();
funcionesCarrito.imprimirCarrito(carrito);
funcionesCarrito.agregarYQuitar(productos, carrito);










