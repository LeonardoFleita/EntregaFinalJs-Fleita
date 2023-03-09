

function imprimirCarrito(array1, array2){
    let contenedor = document.getElementById("carrito__tabla");
    let carritoAgrupado = agruparRepetidos(array1, array2);
    if(array2.length > 0){
        for(const prod of carritoAgrupado){
            if(prod.cantidad > 0){
                let fila = document.createElement("tr");
                fila.innerHTML = `<td><h4>${prod.nombre}</h4></td>
                                <td><p>Cantidad: ${prod.cantidad}</p></td>
                                <td><button id="agregar${prod.id}">+</button><button id="quitar${prod.id}">-</button></td>
                                <td><p>Precio: $${prod.precio}</p></td>`
                contenedor.appendChild(fila);
            };
        };
    };
    let total = precioTotal(carritoAgrupado);
    let totalImpreso = document.createElement("div");
    totalImpreso.className = "total";
    totalImpreso.innerHTML = `<h3>Total: $${total}</h3>`;
    contenedor.appendChild(totalImpreso);
};
