const FormuLogin = document.getElementById("FormuLogin");
FormuLogin.addEventListener("submit" , async function (e) {
    e.preventDefault();

    const   boton = formulario.getElementById("btnLogin");
    const  mensaje = formulario.getElementById("mensajeLogin");

    boton.disabled = true;

    try {
        const respuesta = await fetch(formulario.action, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(object.fromEntries(new FormData(formulario).entries()),
        ),
    });

    const resultado = await respuesta.json();

    if (respuesta.success) {
        mensaje.textContent = "no fue posible iniciar sesión .por favor, verifica tus credenciales.";
        boton.disabled = false;
        return;
        }

         localStorage.setItem('Logueado', 'true');
        localStorage.setItem('Rol', resultado.Rol);
        localStorage.setItem('Nombre', resultado.Nombre);

        window.location.href = "dashboaard.html";
    }catch (error) {
        console.error("Error al iniciar sesión:", error);
        mensaje.textContent = 
        "ocurrio un error al intentar iniciar sesión. por favor, intenta nuevamente.";
    } finally {
        boton.disabled = false;
    }
});