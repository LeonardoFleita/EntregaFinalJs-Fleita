import { precioTotal, almacenar, logueo, cerrarSesion, mostrarUsuario } from "./modules/generales.js";

let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = JSON.parse(localStorage.getItem("productos"));
let usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
let ordenesDeCompra = [];
let ordenesDeCompraEnStorage = JSON.parse(sessionStorage.getItem("ordenesDeCompra"));

//Imprime el carrito en la página
function imprimirCarrito(produ, carri){
    let contenedor = document.getElementById("carrito__tabla");
    if(carri){
        for(const prod of carri){
            if(prod.cantidad > 0){
                let fila = document.createElement("tr");
                let precio = parseFloat(prod.price);
                let obj = produ.filter((elemento) => elemento.id == prod.id);
                let precioUnitario = parseFloat(obj[0].price);
                fila.innerHTML = `<td><img src="${prod.image}" class="productoEnCarrito__img"></td>
                                <td><h2>${prod.title}</h2></td>
                                <td><p>Precio: US$${precioUnitario}</p></td>
                                <td><p>Cantidad: ${prod.cantidad}</p></td>
                                <td><button class="agregarYQuitar" id="agregar${prod.id}">+</button><button class="agregarYQuitar" id="quitar${prod.id}">-</button></td>
                                <td><p>Total: US$${precio.toFixed(2)}</p></td>`
                contenedor.appendChild(fila);
            };
        };
    };
    if(carri){
        let total = parseFloat(precioTotal(carri));
        let seccion = document.getElementById("carrito__total");
        seccion.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
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

//Permite comprar si hay una sesión iniciada
function comprar(carri, user){
    let boton = document.getElementById("comprar");
    boton.onclick = () =>{
        if(usuario){
            let numeroDePedido = (ordenesDeCompra.length + 1);
            let orden = {
                "numeroDeOrden": numeroDePedido,
                "productos": carri,
                "usuario": user,
            };
            swal({
                title: "Compra exitosa",
                icon: "success",
            })
            .then(()=>{
                ordenesDeCompra.push(orden);
                sessionStorage.setItem("ordenesDeCompra", JSON.stringify(ordenesDeCompra));
                sessionStorage.setItem("orden", JSON.stringify(orden));
                localStorage.removeItem("carrito");
                location.href="./ordenDeCompra.html";
            });
        }else{
            swal({
                title: "Necesita iniciar sesión para continuar",
                icon: "warning",
            })
            .then(()=>{
                location.href = "./login.html"
            });
        };
    };
};


//EJECUCIÓN

ordenesDeCompraEnStorage && (ordenesDeCompra = ordenesDeCompraEnStorage);
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
imprimirCarrito(productos, carrito);
limpiarCarrito();
agregarYQuitar(productos, carrito);
comprar(carrito, usuario);
logueo(usuario);
mostrarUsuario(usuario);
cerrarSesion();