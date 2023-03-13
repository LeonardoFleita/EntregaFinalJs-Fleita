import {imprimirProductos, agregarAlCarrito} from "./functions/funcProductos.js"
import {almacenar} from "./functions/funcCarrito.js"
let carrito = [];
let carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));
const productos = JSON.parse(localStorage.getItem("productos"));

function almacenarApiEnStorage(clave){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                almacenar(clave, JSON.stringify(json));
            });
};

almacenarApiEnStorage("productos");
console.log(productos);

carritoEnStorage && (carrito = carritoEnStorage);
imprimirProductos(productos);
//agregarAlCarrito(productos, carrito);



