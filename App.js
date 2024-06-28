function goToHome() {
    window.location.href = `./Home/home.html`;
}
// App.js

// Texto a mostrar con efecto de escritura
const nombre = "Katherine Contreras";
const textoFinal = "Veamos la página que les preparé";

// Elementos del DOM
const textoElemento = document.getElementById('texto');
const nombreElemento = document.getElementById('nombre');

// Función para simular el efecto de escritura
function efectoEscritura(texto, elemento, intervalo, callback) {
    let i = 0;
    const interval = setInterval(function() {
        elemento.textContent += texto.charAt(i);
        i++;
        if (i > texto.length - 1) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, intervalo);
}

// Función para animar el fade-in del texto final
function fadeIn(elemento, duracion) {
    elemento.style.transition = `opacity ${duracion}ms ease`;
    elemento.style.opacity = 1;
}

// Función que se ejecuta cuando el DOM ha cargado
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar el efecto de escritura para el nombre
    efectoEscritura(nombre, nombreElemento, 100, function() {
        // Después de escribir el nombre, iniciar el efecto de escritura para el texto final
        efectoEscritura(textoFinal, textoElemento, 0, function() {
            // Al terminar de escribir el texto final, hacer fade-in
            fadeIn(textoElemento, 1000); // 1000 milisegundos = 1 segundo
        });
    });
});