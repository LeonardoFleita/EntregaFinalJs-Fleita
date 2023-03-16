import { almacenar } from "./modules/generales.js";

let signIn = document.getElementById("signIn");
let signUp = document.getElementById("signUp");
let usuariosRegistrados = [];
let usuariosEnStorage = JSON.parse(localStorage.getItem("usuarios"));


function iniciar(){
    signIn.innerHTML = `<div class="signIn__formulario">
                            <h1>Iniciar sesión</h1>
                            <legend>E-mail</legend>
                            <input type="email" id="signIn__email" value="">
                            <legend>Contraseña</legend>
                            <input type="password" id="signIn__pass" value="">
                        </div>
                        <button id="signIn__iniciar">Iniciar</buttton>`;
};

function esUsuario(usuarios){
    let email = document.getElementById("signIn__email");
    let pass = document.getElementById("signIn__pass");
    let boton = document.getElementById("signIn__iniciar");
    boton.onclick = () =>{
        let usuario = usuarios.filter((elemento) => elemento.correo == email.value);
        if(usuario[0]){
            if(usuario[0].pass == pass.value){
                almacenar("usuarioLogueado", JSON.stringify(usuario[0]));
                swal({
                    title: `Bienvenido ${usuario[0].nombre}`,
                    icon: "success",
                })
                .then(()=>{
                    location.href = "../index.html";
                });

            }else{
                swal({
                    title: "Usuario o contraseña incorrectos",
                    icon: "error",
                })
            }
        }else{
            swal({
                title: "Usuario o contraseña incorrectos",
                icon: "error",
            })
        }; 
    };
};

class user{
    constructor(nombre, apellido, telefono, direccion, dni, correo, pass){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.dni = parseInt(dni);
        this.correo = correo;
        this.pass = pass;
    };
};

usuariosRegistrados.push(new user("Leonardo", "Fleita", "1155555555", "Calle falsa 123", "33471611", "leojf@gmail.com", "leo0000"));


function registro(){
    signUp.innerHTML = `<div class="signUp__formulario">
                            <h1>Registrarse</h1>
                            <legend>Nombre</legend>
                            <input type="text" id="signUp__nombre" class="signUp__input">
                            <legend>Apellido</legend>
                            <input type="text" id="signUp__apellido" class="signUp__input">
                            <legend>Teléfono</legend>
                            <input type="text" id="signUp__tel" class="signUp__input">
                            <legend>Dirección</legend>
                            <input type="text" id="signUp__dir" class="signUp__input">
                            <legend>DNI</legend>
                            <input type="text" id="signUp__dni" class="signUp__input">
                            <legend>E-mail</legend>
                            <input type="email" id="signUp__email" class="signUp__input">
                            <legend>Contraseña</legend>
                            <input type="password" id="signUp__pass" class="signUp__input">
                        </div>
                        <button id="signUp__registro">Registrarse</buttton>`
};

function registrarse(usuarios){
    let nombre = document.getElementById("signUp__nombre");
    let apellido = document.getElementById("signUp__apellido");
    let tel = document.getElementById("signUp__tel");
    let dir = document.getElementById("signUp__dir");
    let dni = document.getElementById("signUp__dni");
    let correo = document.getElementById("signUp__email");
    let pass = document.getElementById("signUp__pass");
    let boton = document.getElementById("signUp__registro");
    let inputs = document.getElementsByClassName("signUp__input");
    boton.onclick = () =>{
        let vacio = false;
        for(const el of inputs){
            if(!el.value){
                vacio = true;
                break;
            };
        };
        if(vacio){
            swal({
                title: "Hay campos vacíos",
                icon: "error"
            })
        }else{
            let nuevoUsuario = (new user(nombre.value, apellido.value, tel.value, dir.value, dni.value, correo.value, pass.value));
            let emailRegistrado = usuarios.find((u) => u.correo == correo.value);
            let dniRegistrado = usuarios.find((u) => u.dni == dni.value);
            if(!emailRegistrado && !dniRegistrado){
                usuarios.push(nuevoUsuario);
                localStorage.removeItem("usuarios");
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                swal({
                    title: "Usuario registrado",
                    text: "Inicie sesión a continuación",
                    icon: "success",
                })
                .then(()=>{
                    window.location.reload();
                });
            }else if(emailRegistrado && !dniRegistrado){
                swal({
                    title: "El e-mail ya se encuentra registrado",
                    icon: "error",
                });
            }else if(dniRegistrado && !emailRegistrado){
                swal({
                    title: "El dni ya se encuentra registrado",
                    icon: "error",
                });
            }else{
                swal({
                    title: "Usuario ya existente",
                    icon: "error",
                });
            };
        }; 
    };
};

//EJECUCIÓN

usuariosEnStorage && (usuariosRegistrados = usuariosEnStorage);
console.log(usuariosEnStorage);
swal({
    title: "Bienvenido",
    text: "¿Es usted usuario registrado en nuestro sitio?",
    buttons: {
        si: {
            text: "Sí",
            value: "iniciar",
        },
        no: {
            text: "No",
            value: "registrarse",
        }
    }
})
.then((value)=>{
    switch (value){

        case "registrarse":
            signUp.className = "login";
            registro();
            registrarse(usuariosRegistrados);
            break;

        case "iniciar":
            signIn.className = "login";
            iniciar();
            esUsuario(usuariosRegistrados);
            break;
    };
});

console.log(usuariosRegistrados);
