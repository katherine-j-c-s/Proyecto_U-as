document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;

    // Mostrar los indicadores de posición
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });

    showSlide(currentSlide);

    function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove('active'));
        document.querySelectorAll('.indicator').forEach((indicator) => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        document.querySelectorAll('.indicator')[index].classList.add('active');
        currentSlide = index;
    }

    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });
});