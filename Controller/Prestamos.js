document.addEventListener("DOMContentLoaded", () => {
    console.log("Módulo de Préstamos cargado correctamente.");

    const formPrestamo = document.getElementById("formPrestamo");

    if (formPrestamo) {
        formPrestamo.addEventListener("submit", (e) => {
            e.preventDefault();

            // Capturar datos del formulario
            const asociado = document.getElementById("asociadoPrestamo").value;
            const monto = document.getElementById("montoPrestamo").value;
            const plazo = document.getElementById("plazoPrestamo").value;
            const tasa = document.getElementById("tasaPrestamo").value;

            // Validación de campos
            if (!asociado || !monto || !plazo) {
                alert("Por favor diligencie todos los campos requeridos.");
                return;
            }

            // Formatear monto a dinero
            const montoFormateado = Number(monto).toLocaleString("es-CO");

            // Mensaje de éxito
            alert(`¡Préstamo de $${montoFormateado} aprobado exitosamente a ${plazo} meses!`);
            
            // Reiniciar el formulario
            formPrestamo.reset();
        });
    }
});