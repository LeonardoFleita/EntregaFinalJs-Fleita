let productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado"));

let titulo = document.getElementById("producto__title");
    titulo.innerHTML = productoSeleccionado.title;

let contenedor = document.getElementById("productoSeleccionado");
contenedor.innerHTML = `<div class="productoSeleccionado__img">
                            <img src="${productoSeleccionado.image}" alt="${productoSeleccionado.title}">
                        </div>
                        <div class="productoSeleccionado__descripcion">
                            <p>${productoSeleccionado.description}</p>
                        </div>
                        <div class="productoSeleccionado__nombre">
                            <h1>${productoSeleccionado.title}</h1>
                            <p>US$ ${productoSeleccionado.price}</p>
                        </div>
                        <div class="productoSeleccionado__comprar">
                            <button id="botonComprarProductoSeleccionado">Comprar</button>
                        </div>`;