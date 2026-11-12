const formulario = document.getElementById('FormuLogin');
formulario.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const boton = formulario.querySelector('button[type="submit"]');
    const mensaje = document.getElementById("mensajelogin");
    boton.disabled = true;
    try{
        const respuesta = await fetch (formulario.action, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify
            (Object.fromEntries(new FormData(formulario).entries()),//convertir los datos del formularioen un objeto y luego a JSON
        )
        });
        const resultado = await respuesta.json();
        if(!resultado.success){ /*!Signo para negar*/
            mensaje.textContent = "No fue posible iniciar sesión. Por favor, verifica tus credenciales";
            boton.disabled = false;
            return;
        }
        localStorage.setItem("Logueado", "true");
        localStorage.setItem("rol", resultado.rol);
        localStorage.setItem("nombre", resultado.nombre);
        window.location.href = 'dashboaard.html';//redirigir al usuario a la la pagina del dashboaard si la respuesta es exitosa 

    }catch (error){
        console.error("Error al iniciar sesión:", error);
        mensaje.textContent =
         "Ocurrio un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
    } finally{
        boton.disabled = false;
    }
});