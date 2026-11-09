
document.addEventListener('DOMContentLoaded', () => {

    // VERIFICAR SI EL USUARIO INICIO SESION
    const logueado = localStorage.getItem('logueado');

    if (logueado !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // OBTENER LOS DATOS DEL USUARIO
    const nombre = localStorage.getItem('Nombre');
    const rol = localStorage.getItem('rol');

    // MOSTRAR NOMBRE
    const nombreUsuario = document.getElementById('NombreUsuario');

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
function CerrarSesion() {

    if (confirm('¿Estas seguro de cerrar sesión?')) {

        localStorage.clear();

        window.location.href = 'login.html';

    }

}
