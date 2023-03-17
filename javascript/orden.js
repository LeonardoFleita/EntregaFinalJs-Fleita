import { logueo, cerrarSesion, mostrarUsuario } from "./modules/generales.js";

let usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
let ordenDeCompra = JSON.parse(sessionStorage.getItem("orden"));

//Imprime la orden
function imprimirOrden(orden, user){
    let contenedor = document.getElementById("orden");
    let formato = {month: 'long', day: 'numeric'};
    let fecha = luxon.DateTime.now().plus({days: 2}).setLocale('es').toLocaleString(formato);
    contenedor.innerHTML = `<h1>Orden n° ${orden.numeroDeOrden}<h1>
                            <h2>Productos</h2>
                            <div id="productosOrden"></div>
                            <h2>Datos del comprador</h2>
                            <p>${user.nombre} ${user.apellido}</p>
                            <p>Teléfono ${user.telefono}</p>
                            <h3>Dirección de entrega</h3>
                            <p>${user.direccion}</p>
                            <h2>Fecha de entrega</h2>
                            <p>${fecha}</p>`;
};

//Imprime los productos dentro de la orden
function productosParaImprimir(orden){
    let productos = orden.productos;
    let contenedor = document.getElementById("productosOrden");
    for(const prod of productos){

        contenedor.innerHTML += `<div class="orden__producto">
                                    <img src="${prod.image}" alt="producto${prod.id}"><p>${prod.title} x${prod.cantidad}</p>
                                </div>`
    };
    console.log(productos);
};


//EJECUCIÓN

if(usuario){
    imprimirOrden(ordenDeCompra, usuario);
    productosParaImprimir(ordenDeCompra);
    logueo(usuario);
    mostrarUsuario(usuario);
    cerrarSesion();
    console.log(ordenDeCompra);
}else{
    location.href = "../index.html";
};

