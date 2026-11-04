document.addEventListener('DOMContentLoaded', () =>{
const loqueado = localStorage.getItem('loqueado');

if (loqueado !== 'true') {
    window.location.href = 'login.html';
    return;
}

const nombre = localStorage.getItem('Nombre');
const rol = localStorage.getItem('rol');

document.getElementById('NombreUsuario').textContent = nombre;

if (rol === 'admin') {
 document.getElementById('tarjetasAdministrador'.classList.remove('d-none'));
 document.getElementById('tarjetaAsociados').classList.add('d-none'); 
}else{
 document.getElementById('tarjetasAdministrador'.classList.add('d-none'));
 document.getElementById('tarjetaAsociados').classList.remove('d-none');    
}
});

function CerrarSesión(){
    localStorage.clear();
    window.location.href = "login.html";
}