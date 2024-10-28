// Obtener el ID de la película de la URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Hacer una solicitud a la API para obtener detalles de la película
fetch(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed580b25b58102be44c94151cda257c0`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((movie) => {
    const movieDetailsContainer = document.getElementById("movie-details");
    movieDetailsContainer.innerHTML = `
            <h1>${movie.title}</h1>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.overview}</p>
            <p><strong>Fecha de lanzamiento:</strong> ${movie.release_date}</p>
            <p><strong>Calificación:</strong> ${movie.vote_average}</p>
        `;
  })
  .catch((error) =>
    console.error("Error al obtener detalles de la película:", error)
  );
