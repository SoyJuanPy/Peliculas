function toggleMenu() {
  let burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");
  list.classList.toggle("menu__links--show");
}

// Manejar la búsqueda de películas
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim(); // Obtener el valor de búsqueda
  if (query) {
    // Redirigir a search.html con el parámetro de búsqueda
    window.location.href = `links/resultados.html?query=${encodeURIComponent(
      query
    )}`;
  } else {
    alert("Por favor, ingrese un término de búsqueda.");
  }
});

// Función para cargar películas
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
        return;
      }

      movies.forEach((movie) => {
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
