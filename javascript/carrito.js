import { precioTotal, cantidadTotal, almacenar } from "./modules/generales.js";

let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = JSON.parse(localStorage.getItem("productos"));

//Imprime el carrito en la página
function imprimirCarrito(carri){
    let contenedor = document.getElementById("carrito__tabla");
    if(carri){
        for(const prod of carri){
            if(prod.cantidad > 0){
                let fila = document.createElement("tr");
                fila.innerHTML = `<td><img src="${prod.image}" class="productoEnCarrito__img"></td>
                                <td><h2>${prod.title}</h2></td>
                                <td><p>Cantidad: ${prod.cantidad}</p></td>
                                <td><button class="agregarYQuitar" id="agregar${prod.id}">+</button><button class="agregarYQuitar" id="quitar${prod.id}">-</button></td>
                                <td><p>Precio: US$${prod.price}</p></td>`
                contenedor.appendChild(fila);
            };
        };
    };
    if(carri){
        let total = precioTotal(carri);
        let seccion = document.getElementById("carrito__contenedorTabla");
        seccion.innerHTML += `<div class="total">
                                    <h3>Total: $${total}</h3>
                                    <button class="botonCarrito" id="limpiar">Limpiar carrito</button>
                                    <button class="botonCarrito" id="comprar">Comprar</button>
                                </div>`;
    }
};

//Agrega y quita productos del carrito desde el mismo carrito
function agregarYQuitar(produ, carri){
    if(carri){
        for(const prod of carri){
            let obj = produ.filter((elemento) => elemento.id == prod.id);
            let precioUnitario = parseInt(obj[0].price);
            let agregar = document.getElementById("agregar"+prod.id);
            let quitar = document.getElementById("quitar"+prod.id);
            agregar.addEventListener("click", () => { 
                prod.cantidad = parseInt(prod.cantidad) + 1 ;
                prod.price = precioUnitario * parseInt(prod.cantidad);
                localStorage.removeItem("carrito");
                almacenar("carrito", JSON.stringify(carri));
                window.location.reload();
            });
            quitar.addEventListener("click", () => {
                prod.cantidad = parseInt(prod.cantidad) - 1 ;
                prod.price = precioUnitario * parseInt(prod.cantidad);
                carri = carri.filter((elemento) => elemento.cantidad > 0);
                localStorage.removeItem("carrito");
                if(carri.lenght > 0){
                    almacenar("carrito", JSON.stringify(carri))
                };
                window.location.reload();
            });
        };
    }else{
        swal({
            title: "Carrito vacío",
            text: "Será redireccionado al inicio",
            icon: "warning",
        })
        .then(()=>{
            location.href = "../index.html"
        });
    };
};

//Limpia el carrito
function limpiarCarrito(){
    if(carrito){
        let boton = document.getElementById("limpiar");
        boton.onclick = () =>{
            localStorage.removeItem("carrito");
            window.location.reload();
        };
    }
};

imprimirCarrito(carrito);
limpiarCarrito();
agregarYQuitar(productos, carrito);