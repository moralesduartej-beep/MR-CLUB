//lista tempooral de usuario para probar  el inicio de sesión.
    const Usuarios = [
    {usuario: 'admin@gmail.com', clave: '123', rol: 'admin' , nombre: 'admin  MR'},
    {usuario: 'pepito@gmail.com',clave: '123', rol: 'asociados' , nombre : 'juan perez' }
];

document.getElementById('FormuLogin').addEventListener('submit' , function (e) {
 e.preventDefault();
 alert("hola");

    const usuarioInput = document.getElementById('Email').value;
    const claveInput =document.getElementById('Password').value;

    const usuarioEncontrado = Usuarios.find(
        u => u.usuario === usuarioInput && u.clave === claveInput
    ); 

    if (usuarioEncontrado) {

        localStorage.setItem('loqueado','true');
        localStorage.setItem('rol',usuarioEncontrado.rol);
        localStorage.setItem('Nombre',usuarioEncontrado.nombre);
        window.location.href = 'dashboaard.html';
    }else{
        alert('usuario o contraseña incorrectos');
    }
});