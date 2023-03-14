let productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado"));

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
                                <button id="botonComprarProductoSeleccionado">Comprar</button>
                                <input type="number" value="1" min="1">
                            </div>
                        </section>`;