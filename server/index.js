fetch("/api/movies")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API: " + response.statusText);
        }
        return response.json();
    })
    .then(movies => {
        // Manejo de la lista de películas
        console.log(movies);
        // Aquí puedes agregar la lógica para mostrar las películas en tu interfaz
    })
    .catch(error => {
        console.error("Error al obtener películas:", error);
        // Aquí puedes mostrar un mensaje en la interfaz para el usuario
    });
