import { almacenar, logueo, cerrarSesion, mostrarUsuario, filtrar } from "./modules/generales.js"

const productos = JSON.parse(localStorage.getItem("productos"));
let usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));


//Recupera los productos de la Api y los guarda en el storage
function almacenarApiEnStorage(clave){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                almacenar(clave, JSON.stringify(json));
            });
};

//Imprime los productos en la página junto con el botón de comprar y la cantidad
function imprimirProductos(array){
    for(const elemento of array){
        let div = document.createElement("div");
        div.className = "contenedor"
        div.innerHTML = `<a href="./pages/producto.html" class="linkAProducto">
                        <img src="${elemento.image}" alt="${elemento.title}" class="fotoProducto">
                        <h2>${elemento.title}</h2>
                        <p>US$ ${elemento.price}</p>
                        </a>`;
        document.getElementById("productos__contenedor").appendChild(div);
        div.onmouseover = () =>{
            localStorage.removeItem("productoSeleccionado");
            localStorage.setItem("productoSeleccionado", JSON.stringify(elemento));
        };
    };
};

//Toast
let formato = {month: 'long', day: 'numeric'};
let oferta = luxon.DateTime.now().plus({days: 7}).setLocale('es').toLocaleString(formato);
let toast = Toastify({
    text: `Descuentos en todos nuestros productos hasta el ${oferta}`,
    duration: 5000,
    style: {
            background: "linear-gradient(to right, #484849, #777879)",
        },
    });


//EJECUCIÓN

logueo(usuario);
mostrarUsuario(usuario);
cerrarSesion();
setTimeout(()=>{toast.showToast();}, 3000);
almacenarApiEnStorage("productos");
filtrar(productos);
let filtro = JSON.parse(sessionStorage.getItem("filtro"));
if(filtro){
    imprimirProductos(filtro);   
}else{
    imprimirProductos(productos);
};






