async function registrarClub() {
            document.getElementById('registroForm').addEventListener('submit', async function(event) {
                event.preventDefault(); // Evitar el envío del formulario

                // Obtener valores de los campos
                const nombreClub = document.getElementById('nombre').value;
                const nick = document.getElementById('nick').value;
                const email = document.getElementById('email').value;
                const contrasenia = document.getElementById('contrasena').value;
                const descripcion = document.getElementById('description').value;

                // Validaciones
                if (nombreClub.length < 6 || nombreClub.length > 60) {
                    alert('El nombre del club debe tener entre 6 y 60 caracteres.');
                    return;
                }

                if (nick.length < 6 || nick.length > 60) {
                    alert('El nick debe tener entre 6 y 60 caracteres.');
                    return;
                }

                if (contrasenia.length < 8) {
                    alert('La contraseña debe tener al menos 8 caracteres.');
                    return;
                }

                // Encriptar la contraseña
                const hashedPassword = await hashPassword(contrasenia);

                // Comprobar si el nick o el email ya existen en db.json
                const response = await fetch('http://localhost:3000/clubs');
                const clubs = await response.json();

                const nickExiste = clubs.some(club => club.nick === nick);
                const emailExiste = clubs.some(club => club.email === email);

                if (nickExiste) {
                    alert('El nick ya está registrado. Por favor, elige otro.');
                    return;
                }

                if (emailExiste) {
                    alert('El email ya está registrado. Por favor, elige otro.');
                    return;
                }

                // Obtener el ID más alto de los clubs registrados
                const maxId = clubs.reduce((max, club) => (club.id > max ? club.id : max), 0);
                const newId = maxId + 1;

                // Crear objeto del nuevo club con ID y contraseña encriptada
                const nuevoClub = {
                    id: newId,
                    nombre: nombreClub,
                    nick: nick,
                    email: email,
                    contrasenia: hashedPassword,
                    descripcion: descripcion
                };

                // Enviar datos a la API con POST
                fetch('http://localhost:3000/clubs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoClub)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la red');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Club registrado exitosamente');
                    document.getElementById('registroForm').reset(); // Limpiar el formulario
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al registrar el club');
                });
            });
        }

        // Función para encriptar la contraseña con SHA-256
        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        // Inicializar la función al cargar la página
        window.onload = registrarClub;