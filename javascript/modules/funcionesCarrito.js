import { almacenar } from "../index.js";

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

//Agrupa elementos repetidos en uno solo, actualizando los valores de cantidad y precio, es para usar dentro de agregarAlCarrito()
export function agruparRepetidos(array1, array2){
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

//Imprime el carrito en la página
export function imprimirCarrito(carri){
    let contenedor = document.getElementById("carrito__tabla");
    if(carri.length > 0){
        for(const prod of carri){
            if(prod.cantidad > 0){
                let fila = document.createElement("tr");
                fila.innerHTML = `<td><h4>${prod.nombre}</h4></td>
                                <td><p>Cantidad: ${prod.cantidad}</p></td>
                                <td><button class="agregarYQuitar" id="agregar${prod.id}">+</button><button class="agregarYQuitar" id="quitar${prod.id}">-</button></td>
                                <td><p>Precio: $${prod.precio}</p></td>`
                contenedor.appendChild(fila);
            };
        };
    };
    let total = precioTotal(carri);
    let totalImpreso = document.createElement("div");
    totalImpreso.className = "total";
    totalImpreso.innerHTML = `<h3>Total: $${total}</h3>`;
    contenedor.appendChild(totalImpreso);
};

//Agrega y quita productos del carrito desde el mismo carrito
export function agregarYQuitar(produ, carri){
    for(const prod of carri){
        let obj = produ.filter((elemento) => elemento.id == prod.id);
        let precioUnitario = parseInt(obj[0].precio);
        let agregar = document.getElementById("agregar"+prod.id);
        let quitar = document.getElementById("quitar"+prod.id);
        agregar.addEventListener("click", () => { 
            prod.cantidad = parseInt(prod.cantidad) + 1 ;
            prod.precio = precioUnitario * parseInt(prod.cantidad);
            prod.precioConIva = prod.precio * 1.21;
            localStorage.removeItem("carrito");
            almacenar("carrito", JSON.stringify(carri));
            window.location.reload();
        });
        quitar.addEventListener("click", () => {
            prod.cantidad = parseInt(prod.cantidad) - 1 ;
            prod.precio = precioUnitario * parseInt(prod.cantidad);
            prod.precioConIva = prod.precio * 1.21;
            carri = carri.filter((elemento) => elemento.cantidad > 0);
            localStorage.removeItem("carrito");
            carri.length > 0 && almacenar("carrito", JSON.stringify(carri));
            window.location.reload();
        });
    };
    
};

//Limpia el carrito
export function limpiarCarrito(){
    let boton = document.getElementById("limpiar");
    boton.onclick = () =>{
        localStorage.removeItem("carrito");
        window.location.reload();
    };
};

//Retorna precio total de los objetos de un array
export function precioTotal(array){
    let nuevoArray = array.map((el) => {
        return el.precio});
    let total = nuevoArray.reduce((acumulador, precio) => acumulador + precio, 0);
    return total;
};

//Retorna cantidad total de los objetos un array (propiedad cantidad, no cantidad real de objetos en array)
export function cantidadTotal(array){
    let nuevoArray = array.map((el) => {
        return parseInt(el.cantidad)});
    let total = nuevoArray.reduce((acumulador, cant) => acumulador + cant, 0);
    return total;
};