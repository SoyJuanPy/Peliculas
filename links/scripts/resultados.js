function toggleMenu() {
  const burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");
  list.classList.toggle("menu__links--show");
}

document.addEventListener("DOMContentLoaded", () => {
  const query = new URLSearchParams(window.location.search).get("query");
  const moviesContainer = document.getElementById("movies-container");
  const apiKey = "ed580b25b58102be44c94151cda257c0";
  const baseUrl = "https://api.themoviedb.org/3";

  if (query) {
    fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        if (movies && movies.length > 0) {
          movies.forEach((movie) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-card");

            const isFavorite = isMovieFavorite(movie.id);

            movieDiv.innerHTML = `
              <i class="bi bi-suit-heart-fill heart-icon ${isFavorite ? "red" : ""}" data-id="${movie.id}"></i>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;

            const heartIcon = movieDiv.querySelector(".heart-icon");
            heartIcon.addEventListener("click", (event) => {
              event.stopPropagation();
              toggleFavorite(movie, heartIcon);
            });

            movieDiv.addEventListener("click", () => {
              window.location.href = `info.html?id=${movie.id}`;
            });

            moviesContainer.appendChild(movieDiv);
          });
        } else {
          moviesContainer.innerHTML = `<p>No se encontraron resultados para "${query}".</p>`;
        }
      })
      .catch((error) => console.error("Error al buscar películas:", error));
  }

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", () => {
    const newQuery = searchInput.value.trim();
    if (newQuery) {
      window.location.href = `resultados.html?query=${encodeURIComponent(newQuery)}`;
    } else {
      Swal.fire({
        title: "Upps",
        text: "Por favor, ingrese un térmno de búsqueda.",
        icon: "question",
      });
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newQuery = searchInput.value.trim();
      if (newQuery) {
        window.location.href = `resultados.html?query=${encodeURIComponent(newQuery)}`;
      } else {
        Swal.fire({
          title: "Upps",
          text: "Por favor, ingrese un térmno de búsqueda.",
          icon: "question",
        });
      }
    }
  });
});

function isMovieFavorite(movieId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((fav) => fav.id === movieId);
}

function toggleFavorite(movie, icon) {
  icon.classList.toggle("red");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movieIndex = favorites.findIndex((fav) => fav.id === movie.id);

  if (movieIndex > -1) {
    favorites.splice(movieIndex, 1);
    Swal.fire({ title: "Se quito de favoritos", icon: "error" });
  } else {
    favorites.push(movie);
    Swal.fire({ title: "Se agrego a favoritos", icon: "success" });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
