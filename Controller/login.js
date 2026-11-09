
// LISTA TEMPORAL DE USUARIOS PARA PROBAR EL INICIO DE SESION

const Usuarios = [

    {
        usuario: 'admin@gmail.com',
        clave: '123',
        rol: 'admin',
        nombre: 'admin MR'
    },

    {
        usuario: 'pepito@gmail.com',
        clave: '123',
        rol: 'asociados',
        nombre: 'Juan Perez'
    }

];


// CAPTURAR EL FORMULARIO
document.getElementById('FormuLogin').addEventListener('submit', function(e) {

    e.preventDefault();

    // OBTENER LOS DATOS INGRESADOS
    const usuarioInput = document.getElementById('Email').value.trim().toLowerCase();

    const claveInput = document.getElementById('Password').value;

    // BUSCAR EL USUARIO
    const usuarioEncontrado = Usuarios.find(
        u => u.usuario === usuarioInput && u.clave === claveInput
    );


    // VALIDAR INICIO DE SESION
    if (usuarioEncontrado) {

        // GUARDAR DATOS DEL USUARIO
        localStorage.setItem('logueado', 'true');

        localStorage.setItem('rol', usuarioEncontrado.rol);

        localStorage.setItem('Nombre', usuarioEncontrado.nombre);

        localStorage.setItem('Usuario', usuarioEncontrado.usuario);

        alert('Bienvenido ' + usuarioEncontrado.nombre);

        // ENTRAR AL DASHBOARD
        window.location.href = 'dashboard.html';

    }

    else {

        alert('Usuario o contraseña incorrectos');

    }

});
