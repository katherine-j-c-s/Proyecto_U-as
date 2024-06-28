document.addEventListener('DOMContentLoaded', function() {

    // Obtener todos los elementos de servicio
    const serviceCards = document.querySelectorAll('.service-card');

    // Función para manejar el clic en los servicios
    function handleServiceClick(event) {
        // Obtener el ID del servicio desde el atributo data-id
        const serviceId = parseInt(event.currentTarget.getAttribute('data-id'));

        // Redirigir a la página de detalles.html y pasar los datos
        window.location.href = `../Detalles/detalles.html?id=${serviceId}`;
    }

    // Agregar un evento de clic a cada servicio
    serviceCards.forEach(card => {
        card.addEventListener('click', handleServiceClick);
    });
});