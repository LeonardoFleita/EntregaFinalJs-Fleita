//Almacena objeto en local storage
export const almacenar = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

//Retorna precio total de los objetos de un array
export function precioTotal(array){
    let nuevoArray = array.map((el) => {
        return el.price});
    let total = nuevoArray.reduce((acumulador, precio) => acumulador + precio, 0);
    total = parseFloat(total);
    total = total.toFixed(2);
    return total;
};

//Retorna cantidad total de los objetos un array (propiedad cantidad, no cantidad real de objetos en array)
export function cantidadTotal(array){
    let nuevoArray = array.map((el) => {
        return parseInt(el.cantidad)});
    let total = nuevoArray.reduce((acumulador, cant) => acumulador + cant, 0);
    return total;
};

export function logueo(user){
    let iniciar = document.getElementById("iniciarSesion");
    let cerrar = document.getElementById("cerrarSesion");
    if(user){
        iniciar.className = "display-off";
        cerrar.className = "display-on";
    }else{
        iniciar.className = "display-on";
        cerrar.className = "display-off";
    };
};

export function cerrarSesion(){
    let cerrar = document.getElementById("cerrarSesion__link");
    cerrar.onclick = () =>{
        localStorage.removeItem("usuario");
        window.location.reload();
    }
}