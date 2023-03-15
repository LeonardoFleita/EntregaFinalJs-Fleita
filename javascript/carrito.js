import { precioTotal, almacenar } from "./modules/generales.js";

let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = JSON.parse(localStorage.getItem("productos"));

//Imprime el carrito en la página
function imprimirCarrito(carri){
    let contenedor = document.getElementById("carrito__tabla");
    if(carri){
        for(const prod of carri){
            if(prod.cantidad > 0){
                let fila = document.createElement("tr");
                let precio = parseFloat(prod.price);
                fila.innerHTML = `<td><img src="${prod.image}" class="productoEnCarrito__img"></td>
                                <td><h2>${prod.title}</h2></td>
                                <td><p>Cantidad: ${prod.cantidad}</p></td>
                                <td><button class="agregarYQuitar" id="agregar${prod.id}">+</button><button class="agregarYQuitar" id="quitar${prod.id}">-</button></td>
                                <td><p>Precio: US$${precio.toFixed(2)}</p></td>`
                contenedor.appendChild(fila);
            };
        };
    };
    if(carri){
        let total = precioTotal(carri);
        let seccion = document.getElementById("carrito__total");
        seccion.innerHTML += `<h3>Total: $${total}</h3>`;
    }
};

//Agrega y quita productos del carrito desde el mismo carrito
function agregarYQuitar(produ, carri){
        for(const prod of carri){
            let obj = produ.filter((elemento) => elemento.id == prod.id);
            let precioUnitario = parseFloat(obj[0].price);
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
                carri.length > 0 && almacenar("carrito", JSON.stringify(carri));
                window.location.reload();
            });
        };
};

//Limpia el carrito
function limpiarCarrito(){
        let boton = document.getElementById("limpiar");
        boton.onclick = () =>{
            localStorage.removeItem("carrito");
            window.location.reload();
    }
};


if(!carrito){
    swal({
        title: "Carrito vacío",
        text: "Será redireccionado al inicio",
        icon: "warning",
    })
    .then(()=>{
        location.href = "../index.html"
    });
};
imprimirCarrito(carrito);
limpiarCarrito();
agregarYQuitar(productos, carrito);