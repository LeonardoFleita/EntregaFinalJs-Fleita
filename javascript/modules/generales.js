//Almacena objeto en local storage
export const almacenar = (clave, valor) => {
    localStorage.setItem(clave, valor)
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

//Determina si el usuario está logueado y en base a eso muestra iniciar o cerrar sesión
export function logueo(user){
    let iniciar = document.getElementsByClassName("iniciarSesion");
    let cerrar = document.getElementsByClassName("cerrarSesion");
    if(user){
        for(const us of iniciar){
            us.className = "nav-item display-off";
        };
        for(const us of cerrar){
            us.className = "nav-item display-on";
        };
    }else{
        for(const us of iniciar){
            us.className = "nav-item display-on";
        };
        for(const us of cerrar){
            us.className = "nav-item display-off";
        };
    };
};

//cierra la sesión
export function cerrarSesion(){
    let cerrar = document.getElementsByClassName("cerrarSesion__link");
    for(const boton of cerrar){
        boton.onclick = () =>{
            localStorage.removeItem("usuarioLogueado");
            localStorage.removeItem("carrito");
            sessionStorage.removeItem("filtro");
            sessionStorage.removeItem("orden");
            window.location.reload();
        };
    };
};

//Muestra el usuario logueado en la nav
export function mostrarUsuario(usuario){
    let usuarioLogueado = document.getElementsByClassName("usuarioLogueado");
    if(usuario){
        for(const us of usuarioLogueado){
            us.innerHTML = usuario.nombre;
        };
    }; 
};

//Filtra los productos por categorías para poder imprimir las categorpias seleccionadas en el index
export function filtrar(prods){
    let todos = document.getElementsByClassName("cat__todos");
    let mujer = document.getElementsByClassName("cat__mujer");
    let joyas = document.getElementsByClassName("cat__joyas");
    let hombre = document.getElementsByClassName("cat__hombre");
    let electronica = document.getElementsByClassName("cat__electronica");
    for(const el of todos){
        el.onclick = ()=>{
            sessionStorage.removeItem("filtro");
            sessionStorage.setItem("filtro", JSON.stringify(prods));
            window.location.reload();
        };
    };
    for(const el of mujer){
        el.onclick = ()=>{
            let catMujer = prods.filter((el)=>{
                return el.category == "women's clothing";
            })
            sessionStorage.removeItem("filtro");
            sessionStorage.setItem("filtro", JSON.stringify(catMujer));
            window.location.reload();
        };
    };
    for(const el of joyas){
        el.onclick = ()=>{
            let catJoyas = prods.filter((el)=>{
                return el.category == "jewelery";
            })
            sessionStorage.removeItem("filtro");
            sessionStorage.setItem("filtro", JSON.stringify(catJoyas));
            window.location.reload();
        };
    };
    for(const el of hombre){
        el.onclick = ()=>{
            let catHombre = prods.filter((el)=>{
                return el.category == "men's clothing";
            })
            sessionStorage.removeItem("filtro");
            sessionStorage.setItem("filtro", JSON.stringify(catHombre));
            window.location.reload();
        };
    };
    for(const el of electronica){
        el.onclick = ()=>{
            let catElectronica = prods.filter((el)=>{
                return el.category == "electronics";
            })
            sessionStorage.removeItem("filtro");
            sessionStorage.setItem("filtro", JSON.stringify(catElectronica));
            window.location.reload();
        };
    };
};

