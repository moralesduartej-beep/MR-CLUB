const formAsociado = document.getElementById("formAsociado");

formAsociado.addEventListener("submit", async function (event) {
    // Evitar que se envíe el formulario por defecto
    event.preventDefault();

    const botonGuardar = formAsociado.querySelector("button[type='submit']");
    const mensajeRegistro = document.getElementById("MensajeRegistro");

    /* Lee los datos del formulario y los convierte en un objeto */
    const asociado = Object.fromEntries(new FormData(formAsociado).entries());

    // Validar contraseñas
    if (asociado.Contraseña !== asociado.ConfirmarContraseña) {
        if (mensajeRegistro) {
            mensajeRegistro.textContent = "Las contraseñas no coinciden";
            mensajeRegistro.className = "mb-3 text-center fw-bold text-danger";
        }
        return;
    }

    // Eliminar la confirmación antes de enviar a PHP
    delete asociado.ConfirmarContraseña;

    // Desactivar botón durante el proceso
    botonGuardar.disabled = true;

    try {
        const respuesta = await fetch("../Modelo/GuardarAsociados.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(asociado)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok && resultado.success) {
            if (mensajeRegistro) {
                mensajeRegistro.textContent = resultado.mensaje;
                mensajeRegistro.className = "mb-3 text-center fw-bold text-success";
            }
            formAsociado.reset(); // Corregido el nombre de la variable
        } else {
            if (mensajeRegistro) {
                mensajeRegistro.textContent = resultado.mensaje || "Error al guardar";
                mensajeRegistro.className = "mb-3 text-center fw-bold text-danger";
            }
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        if (mensajeRegistro) {
            mensajeRegistro.textContent = "Error al enviar el formulario";
            mensajeRegistro.className = "mb-3 text-center fw-bold text-danger";
        }
    } finally {
        botonGuardar.disabled = false;
    }
});