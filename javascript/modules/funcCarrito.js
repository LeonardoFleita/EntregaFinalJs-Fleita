export const almacenar = (clave, valor) => {
    localStorage.setItem(clave, valor)
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
        return el.price});
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