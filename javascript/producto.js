import { precioTotal, cantidadTotal, almacenar } from "./modules/funcCarrito.js";

let carrito = [];
let carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));
let productos = JSON.parse(localStorage.getItem("productos"));
let productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado"));

//Agrega productos al carrito y almacena el carrito en el local storage
function agregarAlCarrito(prod, arrayDeEntrada, arrayDeSalida){
    let boton = document.getElementById("botonComprarProducto");
    let cantidad = document.getElementById("cantidadProductoSeleccionado");
    boton.onclick = () => {
        if(cantidad.value >=1){
            let arrayProvisorio = [];
            arrayProvisorio.push(prod);
            for(const el of arrayProvisorio){
                el.cantidad = cantidad.value;    
                el.price *= cantidad.value;
                arrayDeSalida.push(el);
            };  
            localStorage.removeItem("carrito");
            arrayDeSalida = agruparRepetidos(arrayDeEntrada, arrayDeSalida);
            almacenar("carrito", JSON.stringify(arrayDeSalida));
            swal({
                title: "Producto agregado al cacrrito",
                text: "¿Qué deseas hacer a continuación?",
                icon: "success",
                buttons: {
                    seguirComprando: {
                        text: "Seguir comprando",
                        value: "seguir",
                    },
                    verCarrito: {
                        text: "Ver Carrito",
                        value: "carrito",
                    }
                }
            })
            .then((value)=>{
                switch (value){

                    case "seguir":
                        location.href = "../index.html";
                        break;

                    case "carrito":
                        location.href = "./carrito.html"
                }
            });
        };
    };
};

//Agrupa elementos repetidos en uno solo, actualizando los valores de cantidad y precio, es para usar dentro de imprimirCarrito()
function agruparRepetidos(array1, array2){
    let agrupados = [];
    for(const el of array1){
        let repetido = array2.filter((elemento) => elemento.id == el.id);
        let precio = precioTotal(repetido);
        let cantidad = cantidadTotal(repetido);
        let provisorio = [];
        if(cantidad > 0){
            provisorio.push(el);
            provisorio[0].price = precio;
            provisorio[0].cantidad = cantidad;
            agrupados.push(provisorio[0]);
        };
    };
    return agrupados;
};

//EJECUCIÓN

let titulo = document.getElementById("producto__title");
    titulo.innerHTML = productoSeleccionado.title;

let contenedor = document.getElementById("productoSeleccionado");
contenedor.innerHTML = `<section class="productoSeleccionado__contenedor productoSeleccionado__contenedorA">
                            <div class="productoSeleccionado__img">
                                <img src="${productoSeleccionado.image}" alt="${productoSeleccionado.title}">
                            </div>
                            <div class="productoSeleccionado__descripcion">
                                <p>${productoSeleccionado.description}</p>
                            </div>
                        </section>
                        <section class="productoSeleccionado__contenedor productoSeleccionado__contenedorB">
                            <div class="productoSeleccionado__nombre">
                                <h1>${productoSeleccionado.title}</h1>
                                <p>US$ ${productoSeleccionado.price}</p>
                                <button id="botonComprarProducto">Comprar</button>
                                <input type="number" id="cantidadProductoSeleccionado" value="1" min="1">
                            </div>
                        </section>`;

carritoEnStorage && (carrito = carritoEnStorage);
console.log(carrito);
agregarAlCarrito(productoSeleccionado, productos, carrito);