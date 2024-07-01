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
    // menu
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navLinks = mainNav.getElementsByTagName('a');
    for (let link of navLinks) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});