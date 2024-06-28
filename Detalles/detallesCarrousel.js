document.addEventListener('DOMContentLoaded', function() {
    //toma los valores del carrouser
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;

    // Mostrar los indicadores de posición
    slides.forEach((_, index) => {
        //crea el elemento para el indicador
        const indicator = document.createElement('div');
        //agrega la clase
        indicator.classList.add('indicator');
        if (index === currentSlide) {
            //se agrega el activo al que este en la foto actual
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            //muestra las imagenes con la funcion
            showSlide(index);
        });
        //lo agrega al elemento creado
        indicatorsContainer.appendChild(indicator);
    });

    showSlide(currentSlide);

    // Función para mostrar una diapositiva específica según el índice recibido
function showSlide(index) {
    // Remover la clase 'active' de todas las diapositivas y los indicadores de diapositiva
    slides.forEach((slide) => slide.classList.remove('active'));
    document.querySelectorAll('.indicator').forEach((indicator) => indicator.classList.remove('active'));

    // Agregar la clase 'active' a la diapositiva en el índice especificado y al indicador
    slides[index].classList.add('active');
    document.querySelectorAll('.indicator')[index].classList.add('active');

    // Actualizar la variable global currentSlide con el índice de la diapositiva activa
    currentSlide = index;
}

    prevBtn.addEventListener('click', function() {
        // Determinar el índice de la diapositiva anterior
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        // Mostrar la diapositiva correspondiente al índice calculado
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', function() {
        // Determinar el índice de la diapositiva siguiente
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        // Mostrar la diapositiva correspondiente al índice calculado
        showSlide(currentSlide);
    });
});