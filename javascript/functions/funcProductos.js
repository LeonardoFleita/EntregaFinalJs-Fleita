import { precioTotal, cantidadTotal, almacenar } from "./funcCarrito.js";




//CONSTRUCTORES

function producto(id, nombre, precio, descripcion, imagen){
    this.id = parseInt(id)
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.precioConIva = this.precio * 1.21;
};

//Imprime los productos en la página junto con el botón de comprar y la cantidad
export function imprimirProductos(array){
    for(const elemento of array){
        let div = document.createElement("div");
        div.className = "contenedor"
        div.innerHTML = `<img src="${elemento.image}" alt="${elemento.title}" class="fotoProducto">
                        <h3>${elemento.title}</h3>
                        <p>$${elemento.price}</p>`;
                        //`<input type="number" id="cantidad${elemento.id}" value="1" min="1">
                        //<button class="comprar" id="boton${elemento.id}">Comprar</button>`;
        document.getElementById("productos__contenedor").appendChild(div);
    };
};

//Agrega productos al carrito y almacena el carrito en el local storage
export function agregarAlCarrito(arrayDeEntrada, arrayDeSalida){
    for(const prod of arrayDeEntrada){
        let boton = document.getElementById("boton"+prod.id);
        let cantidad = document.getElementById("cantidad"+prod.id);
        boton.onclick = () => {
            if(cantidad.value >=1){
                let arrayProvisorio = [];
                arrayProvisorio.push(prod);
                for(const el of arrayProvisorio){
                    el.cantidad = cantidad.value;    
                    el.precio *= cantidad.value;
                    arrayDeSalida.push(el);
                };  
                localStorage.removeItem("carrito");
                arrayDeSalida = agruparRepetidos(arrayDeEntrada, arrayDeSalida);
                almacenar("carrito", JSON.stringify(arrayDeSalida));
            };
            window.location.reload();
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
            provisorio[0].precio = precio;
            provisorio[0].cantidad = cantidad;
            provisorio[0].precioConIva = precio * 1.21;
            agrupados.push(provisorio[0]);
        };
    };
    return agrupados;
};