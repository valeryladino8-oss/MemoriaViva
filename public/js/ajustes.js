document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtenemos el email que guardamos en el Login (necesario para saber a quién consultar)
    const emailUsuario = localStorage.getItem('userEmail');
    
    if (!emailUsuario) {
        window.location.href = "../index.html";
        return;
    }

    // Ejecutamos la consulta automáticamente al cargar la página
    consultarUsuario(emailUsuario);

    // --- FUNCIÓN PARA CONSULTAR (Como tu getDatos) ---
    async function consultarUsuario(email) {
        let url = `http://localhost:3000/api/usuario/consultar/${email}`;
        let respuesta = await fetch(url);
        let datos = await respuesta.json();
        
        // Asignamos los valores a los inputs del HTML
        document.getElementById('upd_nombre').value = datos.nombre;
        document.getElementById('upd_apellido').value = datos.apellido;
        document.getElementById('upd_telefono').value = datos.telefono;
        document.getElementById('upd_email').value = datos.email;
        document.getElementById('upd_ocupacion').value = datos.ocupacion;

        
        // Si quieres bloquear el email para que no lo cambien, descomenta la siguiente línea:
        // document.getElementById('upd_email').disabled = true;
    }

    // --- FUNCIÓN PARA ACTUALIZAR (Como tu patchDatos) ---
    const formulario = document.getElementById('form-update-data');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Creamos el objeto con los nuevos datos de los inputs
        const datosActualizados = {
            nombre: document.getElementById('upd_nombre').value,
            apellido: document.getElementById('upd_apellido').value,
            telefono: document.getElementById('upd_telefono').value,
            email: document.getElementById('upd_email').value,
            ocupacion:document.getElementById('upd_ocupacion').value

        };

        let url = `http://localhost:3000/api/usuario/actualizar/${emailUsuario}`;

        const config = {
            method: 'PATCH', // O 'PUT', según prefieras en tu backend
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        };

        try {
            let peticion = await fetch(url, config);
            let valores = await peticion.json();

            if (peticion.ok) {
                alert('¡Tus datos se han actualizado con éxito!');
                // Si el usuario cambió su correo, actualizamos el localStorage
                localStorage.setItem('userEmail', datosActualizados.email);
                location.reload(); // Recargamos para ver los cambios
            } else {
                alert('Error al actualizar: ' + valores.mensaje);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    //ACTUALIZAR CONTRASEÑA
    const formPass = document.getElementById('form-update-pass');

    formPass.addEventListener('submit', async (e) => {
        e.preventDefault();

        const currentPass = document.getElementById('current_pass').value;
        const newPass = document.getElementById('new_pass').value;

        // Validación simple: que no estén vacíos
        if (!currentPass || !newPass) {
            alert("Por favor llena ambos campos de contraseña");
            return;
        }

        let url = `http://localhost:3000/api/usuario/actualizar-password/${emailUsuario}`;

        try {
            const respuesta = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ currentPass, newPass })
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Contraseña actualizada con éxito!");
                formPass.reset(); // Limpia los cuadritos de texto
            } else {
                alert("Error: " + resultado.mensaje);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    const btnDelete = document.getElementById('btn-delete');

    btnDelete.addEventListener('click', async () => {
        const confirmar = confirm("¿Estás SEGURO de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
        
        if (confirmar) {
            let url = `http://localhost:3000/api/usuario/eliminar/${emailUsuario}`;
            
            const respuesta = await fetch(url, { method: 'DELETE' });
            
            if (respuesta.ok) {
                alert("Cuenta eliminada exitosamente.");
                localStorage.clear(); // Borramos todo rastro del usuario
                window.location.href = "../index.html";
            }
        }
    });
});