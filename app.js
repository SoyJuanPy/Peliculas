import { fetchMovies } from "./api.js";

function toggleMenu() {
  const burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");
  list.classList.toggle("menu__links--show");
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `links/resultados.html?query=${encodeURIComponent(query)}`;
  } else {
    Swal.fire({
      title: "Upps",
      text: "Por favor, ingrese un término de búsqueda.",
      icon: "question",
    });
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `links/resultados.html?query=${encodeURIComponent(query)}`;
    } else {
      Swal.fire({
        title: "Upps",
        text: "Por favor, ingrese un térmno de búsqueda.",
        icon: "question",
      });
    }
  }
});

const moviesContainer = document.getElementById("movies-container");

if (moviesContainer) {
  fetchMovies()
    .then((movies) => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card");
        movieDiv.innerHTML = `
          <div class="heart-container">
            <i class="bi bi-suit-heart-fill heart-icon" data-id="${movie.id}"></i>
          </div>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;

        const heartIcon = movieDiv.querySelector(".heart-icon");
        if (favorites.some((fav) => fav.id === movie.id)) {
          heartIcon.classList.add("red");
        }

        heartIcon.addEventListener("click", (event) => {
          event.stopPropagation();
          heartIcon.classList.toggle("red");

          const movieExists = favorites.find((fav) => fav.id === movie.id);
          if (!movieExists) {
            favorites.push(movie);
            Swal.fire({ title: "Se agrego a favoritos", icon: "success" });
          } else {
            const index = favorites.findIndex((fav) => fav.id === movie.id);
            favorites.splice(index, 1);
            Swal.fire({ title: "Se quito de favoritos", icon: "error" });
          }

          localStorage.setItem("favorites", JSON.stringify(favorites));
        });

        movieDiv.addEventListener("click", () => {
          window.location.href = `links/info.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(movieDiv);
      });
    })
    .catch((error) => {
      console.error("Error al obtener las películas:", error);
    });
} else {
  console.error("El contenedor de películas no se encontró.");
}
