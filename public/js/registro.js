// // boton de registro
// const btn = document.getElementById('botformu');
//                     const form = document.getElementById('formu');

//                     btn.addEventListener('click', () => {
//                     form.classList.remove('hidden');
//                     btn.classList.add('hidden');
//                     });

// // Boton de iniciar sesion                    
// const btni = document.getElementById('botingre');
//                     const formi = document.getElementById('ingre');

//                     btni.addEventListener('click', () => {
//                     formi.classList.remove('hidden');
//                     btni.classList.add('hidden');
//                     });     



// Esperamos a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    
    const formulario = document.querySelector('.formulario1');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue sola

        // 1. Capturamos los valores de los inputs por su ID
        const email = document.getElementById('floating_email').value;
        const password = document.getElementById('floating_password').value;
        const confirm_password = document.getElementById('floating_repeat_password').value;
        const nombre = document.getElementById('floating_first_name').value;
        const apellido = document.getElementById('floating_last_name').value;
        const telefono = document.getElementById('floating_phone').value;
        const ocupacion = document.getElementById('floating_occupation').value;

        // 2. Validación simple de contraseña
        if (password !== confirm_password) {
            alert("¡Las contraseñas no coinciden, verifica por favor!");
            return;
        }

        // 3. Empacamos los datos para enviarlos al servidor (index.js)
        const datosUsuario = {
            email: email,
            password: password,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            ocupacion: ocupacion,
        };

        try {
            // 4. Enviamos los datos usando FETCH a tu puerto 3000
            const respuesta = await fetch('http://localhost:3000/api/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Bienvenido a Memoria Viva! Usuario registrado con éxito.");
                // 5. Redirección automática a la vista de entrada
                window.location.href = '/vistas/Apli-Inicio1.html'; 
            } else {
                alert("Error: " + resultado.mensaje);
            }

        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("No se pudo conectar con el servidor. ¿Revisaste la terminal?");
        }
    });
});
