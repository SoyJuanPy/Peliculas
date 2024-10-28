function toggleMenu() {
  let burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");
  list.classList.toggle("menu__links--show");
}

// Verifica el contenedor de películas
const moviesContainer = document.getElementById("movies-container");
if (!moviesContainer) {
  console.error("El contenedor de películas no se encontró.");
} else {
  fetch("/api/movies")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((movies) => {
      if (!movies || movies.length === 0) {
        console.error("No se encontraron películas en la respuesta.");
        return; // Salimos si no hay películas
      }

      movies.forEach((movie) => {
        // Verificación de datos de cada película
        if (!movie.poster_path || !movie.title) {
          console.warn("Película sin imagen o título:", movie);
          return;
        }

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card");
        movieDiv.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                `;
        movieDiv.addEventListener("click", () => {
          window.location.href = `links/info.html?id=${movie.id}`;
        });
        moviesContainer.appendChild(movieDiv);
      });
    })
    .catch((error) => console.error("Error al obtener películas:", error));
}
