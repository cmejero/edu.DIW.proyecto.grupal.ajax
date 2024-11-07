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




