document.addEventListener('DOMContentLoaded', function() {
    const serviceId = getUrlId()

    // Función para actualizar los elementos en la página de detalles
    function actualizarDetalles() {
        //busca en la data de servicios el objeto del id por la posicion
        const servicio = servicios[serviceId];

        // Actualizar el título y subtitulo
        document.querySelector('.title h2').textContent = servicio.titulo;
        document.querySelector('.title p').textContent = servicio.subtitulo;

        // Actualizar el precio y detalle
        document.getElementById('precio').textContent = servicio.precio;
        document.getElementById('detalle').textContent = servicio.detalle;

        // Actualizar las imágenes del carrusel
        const slides = document.querySelectorAll('.carousel .slide img');
        
        slides.forEach((img, index) => {
            img.src = servicio.imagenes[index];
        });
    }

    // Llamar a la función para actualizar los detalles
    actualizarDetalles();
});
function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = parseInt(urlParams.get('id'));
    return serviceId
}
function agendarReserva() {
    const serviceId = getUrlId()
    window.location.href = `turnos.html?id=${serviceId}`;
}