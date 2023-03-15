import { almacenar } from "./modules/generales.js";

let signIn = document.getElementById("signIn");
let signUp = document.getElementById("signUp");
let clientes = [];

function iniciar(){
    signIn.innerHTML = `<div>
                            <div class="signIn__formulario">
                                <h1>Iniciar sesión</h1>
                                <legend>E-mail</legend>
                                <input type="email" id="signIn__email" value="">
                                <legend>Contraseña</legend>
                                <input type="password" id="signIn__pass" value="">
                                <button id="signIn__iniciar">Iniciar</buttton>
                            </div>
                        </div>`;
};

function esCliente(usuarios){
    let email = document.getElementById("signIn__email");
    let pass = document.getElementById("signIn__pass");
    let boton = document.getElementById("signIn__iniciar");
    boton.onclick = () =>{
        let usuario = usuarios.filter((elemento) => elemento.correo == email.value);
        if(usuario){
            if(usuario[0].pass == pass.value){
                almacenar("usuario", JSON.stringify(usuario[0]));
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
                .then(()=>{
                    window.location.reload();
                });
            }
        }else{
            swal({
                title: "Usuario o contraseña incorrectos",
                icon: "error",
            })
            .then(()=>{
                window.location.reload();
            });
        }; 
    };
};

class client{
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

clientes.push(new client("Leonardo", "Fleita", "1155555555", "Calle falsa 123", "33471611", "leojf@gmail.com", "leo0000"));

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
            
            break;

        case "iniciar":
            iniciar();
            esCliente(clientes);
            break;
    };
});

console.log(clientes);
