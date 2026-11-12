const formActividad = document.getElementById("formActividad");

async function solicitarApi(metodo,datos){
    const opciones={
        method: metodo,
        Headers: {'Content-Type': 'application/json'},
    }
    if(datos){
        opciones.body = JSON.stringify(datos);
    }

    const respuesta = await fetch("../Modelo/gestionarActividades.php",opciones);
    const resultado = await respuesta.json();

    if(respuesta.status === 401) {
        Window.location.href = "login.html";
    }

    if(!respuesta.ok || !resultado.success){
        throw new error(resultado.mensaje || "error en la solicitud");
    }
    return resultado;
}