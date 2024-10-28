const queryParams = new URLSearchParams(window.location.search);
const query = queryParams.get("query");

if (query) {
  fetch(`/api/search?query=${encodeURIComponent(query)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API de búsqueda");
      }
      return response.json();
    })
    .then((movies) => {
      const moviesContainer = document.getElementById("movies-container");
      if (!moviesContainer) {
        console.error("El contenedor de películas no se encontró.");
        return;
      }

      if (!movies || movies.length === 0) {
        moviesContainer.innerHTML =
          "<p>No se encontraron películas para la búsqueda.</p>";
        return;
      }

      movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card");
        movieDiv.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;
        movieDiv.addEventListener("click", () => {
          window.location.href = `info.html?id=${movie.id}`;
        });
        moviesContainer.appendChild(movieDiv);
      });
    })
    .catch((error) => console.error("Error al buscar películas:", error));
} else {
  console.error("No se proporcionó un término de búsqueda.");
}
