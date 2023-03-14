import { imprimirProductos } from "./functions/funcProductos.js"
import { almacenar } from "./functions/funcCarrito.js"

const productos = JSON.parse(localStorage.getItem("productos"));

function almacenarApiEnStorage(clave){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                almacenar(clave, JSON.stringify(json));
            });
};

almacenarApiEnStorage("productos");
imprimirProductos(productos);




