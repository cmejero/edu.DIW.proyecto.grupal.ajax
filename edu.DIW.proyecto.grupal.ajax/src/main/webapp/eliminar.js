
function eliminarClub() {
    const nick = prompt("Ingresa el NICK del club a eliminar:");
    const contrasenia = prompt("Ingresa la CONTRASEÑA del club:");

    // Confirmación antes de eliminar
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el club con el NICK: ${nick}?`);

    if (confirmacion) {
        fetch('http://localhost:8080/deleteClub', {
            method: 'DELETE', // Asegúrate de que este es el método correcto
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nick: nick, contrasenia: contrasenia }) // Envía el nick y la contraseña en el cuerpo
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            alert('Club eliminado exitosamente.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo eliminar el club: ' + error.message);
        });
    }
}