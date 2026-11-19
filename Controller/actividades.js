const formActividad = document.getElementById("formActividad");
let Administrador = false;
let Actividades = [];
let accionesConfiguradas =false;
const formularioActividad=document.getElementById("formActividad");
const modalActividad=new bootstrap.modal(modalActividad)
async function solicitarApi(metodo, datos) {
    const opciones = {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
    }
    if (datos) {
        opciones.body = JSON.stringify(datos);

    }
    const respuesta = await fetch("../Modelo/gestionarActividades.php", opciones);
    const resultado = await respuesta.json();

    if (respuesta.status === 401) {
        window.location.href = "Login.html";
    }
    if (!respuesta.ok || !resultado.success) {
        throw new Error(resultado.mensaje || "Error en la solicitud");
    }
    return resultado;
}
async function carrgarActividad() {
    try {
        const resultado = await solicitarApi("GET");
        Administrador = resultado.rol === "admin";

        configurarAcciones();
        Actividades = resultado.Actividades;
        mostrarActiviades();


    } catch (error) {
        alert("Error al cargar las actividades: " + error.message);
    }
}
function mostrarActiviades() {

    formActividad.replaceChildren();

    if (Actividades.length === 0) {
        const fila = document.createElement("tr")
        const celda = document.createElement("td")
        celda.colSpan = Administrador ? 5 : 4;
        celda.className = "text-center py-4 text muted"; //Diseño
        celda.textContent = "No hay actividades disponibles.";
        fila.append(celda);
        formActividad.append(fila);
        return;

    }
    Actividades.forEach((Actividades) => {
        const fila = document("tr");
        fila.append(
            crearCelda(Actividades.nombreActividad),
            crearCelda(Actividades.fechaEvento),
            crearCelda(Actividades.munucipio),
            crearCelda(Actividades.totalRecaudado === null ? "Pendiente" : Number(Actividades.totalRecaudado).toLocaleString("es-CO", { style: "currency", currency: "COP" })), //Convertir en pesos colombianos aparece con un signo de pesos
        );
        if (Administrador) {
            const Acciones = document.createElement("td");
            Acciones.className = "text-nowrap";

            const botonEditar = document.createElement("button");
            botonEditar.type = "button";
            botonEditar.className = " btn btn-sm btn-outline-primary me-2";
            botonEditar.innerHTML = '<i class= "bi bi-pencil-square"></i>';
            botonEditar.addEventListener("click", () => abrrirEdicion(Actividades));

            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.className = " btn btn-sm btn-outline-primary me-2";
            botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
            botonEliminar.addEventListener("click", () => 
           eliminarActividad(Actividades));

            Acciones.append(botonEditar, botonEliminar); //Apent que agregue en esa fila la celda de esos dos botones
            fila.append(Acciones); //Que en la fila agrege los botones
        }
        formActividad.append(fila);


    });
}
function crearCelda(texto) {
    const celda = document.createElemen("td");
    celda.textContent = texto;
    return celda;
}

async function eliminarActividad(actividad) {
    const confirmar= window.confirm(`¿deseas eliminar la actividad "${actividad.nombreActividad}"?`,);

     if(!confirmar){
        return
     }

     try{
        await solicitarApi("DELETE", {idActividad:actividad.idActividad});
        await carrgarActividad();
        alert("actividad eliminada corectamente");
     }catch (error) {
        alert(error.message);
     }
}

function configurarAcciones(){
    if(accionesConfiguradas){
        return;
    }
    const botonNueva = document.getElementById("nuevaActividad");
    const encabezadoAcciones = document.getElementById("encabezadoAcciones ");

    if(esAdministrador){
        botonNueva.classList.remove("d-none");
        encabezadoAcciones.classList.remove("d-none");
        accionesConfiguradas = true;
        return;
    }

}

function abrirEdicion(actividad){
    formularioActividad.reset();
    document.getElementById("idActividad").value=actividad.idActividad;
    document.getElementById("nombreActividad").value=actividad.nombreActividad;
    document.getElementById("fechaevento").value=actividad.fechaEvento;
    decument.getElementById("municipio").value=actividad.munucipio;
    decument.getElementById("totalRecaudado").value=actividad.totalRecaudado ??"";

    document.getElementById("campototalrecaudo").classList.remove("d-none");
    document.getElementById("titulomodalActividad").textContent = "editar actividad";
    document.getElementById("guardarActividad").textContent = "guardar cambios";
    modalActividad.show();
}

formularioActividad.addEventListener("submit", async (evento) =>  {
  evento.preventDefault();
  const idActividad=document.getElementById("idActividad").value;

  const datos ={
    nombreActividad:document.getElementById("nombreActividad").value.trim(),
    fechaEvento:document.getElementById("fechaevento").value,
    municipio:document.getElementById("municipio").value.trim(),
  }

  if(idActividad){
    datos.idActividad = Number(idActividad);
    const total =document.getElementById("totalRecaudo").value;
    datos.totalRecaudado =total==="" ? null  : Number(total);
  }

  try{
    await solicitarApi (idActividad ? "PUT" : "POST" ,datos);
    modalActividad.hide();
    alert("actualiza correctamente");
    carrgarActividad();
    
  }catch (error){
    alert(error.message);
  }
  });
carrgarActividad();