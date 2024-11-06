function iniciarSesion() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nick = document.getElementById('nick').value;
        const contrasenia = document.getElementById('contrasena').value;

        fetch('http://localhost:3000/clubs')
    .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(clubs => {
                let usuarioEncontrado = false;

                // Comprobar si el alias y la contraseña coinciden
                clubs.forEach(club => {
                    if (club.nick === nick && club.contrasenia === contrasenia) {
                        usuarioEncontrado = true;
                    }
                });

                if (usuarioEncontrado) {
                    alert('Inicio de sesión exitoso.');
                    
                } else {
                    alert('Usuario o contraseña incorrectos.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cargar los datos de usuarios.');
            });

});
}

// Inicializar la función al cargar la página
window.onload = iniciarSesion;

function eliminarClub() {
    document.getElementById('deleteForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nick = document.getElementById('nick').value;
        const contrasenia = document.getElementById('contrasena').value;

        fetch('http://localhost:3000/clubs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(clubs => {
                let clubEncontrado = false;
                let idClubAEliminar;

                // Buscar el club que coincida con nick y contraseña
                clubs.forEach(club => {
                    if (club.nick === nick && club.contrasenia === contrasenia) {
                        clubEncontrado = true;
                        idClubAEliminar = club.id; // Guardamos el ID para poder eliminarlo más tarde
                    }
                });

                if (clubEncontrado) {
                    // Si se encontró el club, procedemos a eliminarlo
                    if (confirm('¿Estás seguro de que deseas eliminar este club?')) {
                        fetch(`http://localhost:3000/clubs/${idClubAEliminar}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('No se pudo eliminar el club');
                            }
                            alert('El club ha sido eliminado correctamente.');

                            // Luego pedimos el nick nuevamente para verificar
                            const nuevoNick = prompt('Por favor, introduce el nick del club eliminado para verificar si se ha borrado correctamente.');

                            // Verificamos si el club ha sido efectivamente eliminado
                            fetch('http://localhost:3000/clubs')
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Error al cargar los datos.');
                                    }
                                    return response.json();
                                })
                                .then(clubs => {
                                    const clubEliminado = clubs.find(club => club.nick === nuevoNick);
                                    if (clubEliminado) {
                                        alert('El club aún existe.');
                                    } else {
                                        alert('El club ha sido eliminado correctamente.');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    alert('Error al verificar la eliminación del club.');
                                });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('Error al eliminar el club.');
                        });
                    }
                } else {
                    alert('El club no existe o las credenciales son incorrectas.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cargar los datos de usuarios.');
            });
    });
}

// Inicializar la función al cargar la página
window.onload = eliminarClub;


