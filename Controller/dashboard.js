
document.addEventListener('DOMContentLoaded', () => {

    // VERIFICAR SI EL USUARIO INICIO SESION
    const logueado = localStorage.getItem('logueado');

    if (logueado !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // OBTENER LOS DATOS DEL USUARIO
    const nombre = localStorage.getItem('nombre');
    const rol = localStorage.getItem('rol');

    // MOSTRAR NOMBRE
    const nombreUsuario = document.getElementById('nombreUsuario');

    if (nombreUsuario) {
        nombreUsuario.textContent = nombre || 'Usuario';
    }

    // OBTENER LAS DOS SECCIONES
    const tarjetasAdministrador =
        document.getElementById('TarjetasAdministrador');

    const tarjetasAsociados =
        document.getElementById('TarjetasAsociados');


    // MOSTRAR TARJETAS SEGUN EL ROL

    if (rol === 'admin') {

        // MOSTRAR LAS 4 TARJETAS DEL ADMINISTRADOR
        tarjetasAdministrador.classList.remove('d-none');

        // OCULTAR LAS TARJETAS DEL ASOCIADO
        tarjetasAsociados.classList.add('d-none');

    } 

    else if (rol === 'asociados') {

        // OCULTAR LAS 4 TARJETAS DEL ADMINISTRADOR
        tarjetasAdministrador.classList.add('d-none');

        // MOSTRAR SOLAMENTE MI PERFIL Y MIS PAGOS
        tarjetasAsociados.classList.remove('d-none');

    }

    else {

        // SI EL ROL NO ES VALIDO, CERRAR SESION
        localStorage.clear();
        window.location.href = 'login.html';

    }

});


// CERRAR SESION
   async function CerrarSesion() {
    try {
    const respuesta = await  fetch("../Modelo/cerrarSesion.php", {
    method: "POST",
    });
    
     if(!respuesta.ok){
        throw new error("error al cerrar sesion");
     }
        localStorage.clear();
        window.location.href = 'login.html';
    }catch (error) {
        console.error("error al cerrr sesion:,error ")
    }
    }

document.addEventListener('DOMContentLoaded', () => {
    const Logueado = localStorage.getItem('Logueado');
    if (Logueado !== 'true') {
        window.location.href = '../Vista/Login.html'
        return;
    }

    const Nombre = localStorage.getItem('Nombre');
    const Rol = localStorage.getItem('Rol');

    document.getElementById('NombreUsuario').textContent = Nombre;

    if (Rol === 'admin') {
        document.getElementById('TarjetasAdministrador').classList.remove('d-none');
        document.getElementById('TarjetasAsociados').classList.add('d-none');
    }
    else{
        document.getElementById('TarjetasAdministrador').classList.add('d-none');
        document.getElementById('TarjetasAsociados').classList.remove('d-none');
    }
});

async function CerrarSesion(){
    try {
        const respuesta = await fetch("../Modelo/CerrarSesion.php", {method: "POST",});
            if (!respuesta.ok) {
                throw new Error("Error al cerrar sesión");
            } 
             localStorage.clear();
             window.location.href = "../vista/login.html";       
        }catch (error) {
         console.error("Error al cerrar sesión", error);
        
        }
}
