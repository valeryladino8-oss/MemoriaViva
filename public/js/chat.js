
// CARRUSEL

function initCarrusel() {
    const carrusel = document.getElementById('carruselPerfiles');
    const btnIzquierda = document.getElementById('btnIzquierda');
    const btnDerecha = document.getElementById('btnDerecha');

    // Evita errores si no existe en otra vista
    if (!carrusel || !btnIzquierda || !btnDerecha) return;

    btnDerecha.addEventListener('click', () => {
        carrusel.scrollBy({ left: 312, behavior: 'smooth' });
    });

    btnIzquierda.addEventListener('click', () => {
        carrusel.scrollBy({ left: -312, behavior: 'smooth' });
    });
}

// INICIALIZAR

document.addEventListener('DOMContentLoaded', () => {
    initCarrusel();
});