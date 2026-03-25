document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el formulario del modal de login (fíjate que en tu HTML es .formulario2)
    const formularioLogin = document.querySelector('.formulario2');

    formularioLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Capturamos los datos
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // 2. Enviamos al servidor
            const respuesta = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem('userEmail', email);
                
                alert("¡Hola! " + resultado.nombre + ", qué bueno verte de nuevo.");
                // 3. Redireccionamos a la pantalla principal de la App
                window.location.href = '/vistas/Apli-Inicio1.html';
            } else {
                alert("Error: " + resultado.mensaje);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});