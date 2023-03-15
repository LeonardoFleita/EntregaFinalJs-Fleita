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