
export function recuperarDeStorage(nombreDeClave, arrayDeSalida){
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let incluye = clave.includes(nombreDeClave);
        incluye && arrayDeSalida.push(JSON.parse(localStorage.getItem(clave)));
    };
    arrayDeSalida.sort((a, b)=>{
        return a.id - b.id;    
    });
};

//Imprime los productos en la página junto con el botón de comprar y la cantidad
export function imprimirProductos(array){
    for(const elemento of array){
        let div = document.createElement("div");
        div.className = "contenedor"
        div.innerHTML = `<img src="img/${elemento.nombre}.jpg" alt="${elemento.nombre}" class="fotoProducto">
                        <h3>${elemento.nombre}</h3>
                        <p>${elemento.descripcion}</p>
                        <p>$${elemento.precio}</p>
                        <input type="number" id="cantidad${elemento.id}" value="1" min="1">
                        <button class="comprar" id="boton${elemento.id}">Comprar</button>`;
        document.getElementById("carta").appendChild(div);
    };
};