document.addEventListener('DOMCcontentloaded', () =>{
const loqueado = localStorage.getItem('loqueado');

if (loqueado !== 'true') {
    Window.location.href = 'login.html';
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

function cerrarsesion(){
    localStorage.clear();
    winddow.location.href = '../vista/login.html';
}