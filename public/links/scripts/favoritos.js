document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");

  function loadFavorites() {
    favoritesContainer.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie-card");
      movieDiv.innerHTML = `
        <i class="bi bi-suit-heart-fill heart-icon red" data-id="${movie.id}"></i>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      `;

      movieDiv.addEventListener("click", () => {
        window.location.href = `info.html?id=${movie.id}`;
      });

      const heartIcon = movieDiv.querySelector(".heart-icon");
      heartIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        const idToRemove = parseInt(heartIcon.dataset.id);
        removeFromFavorites(idToRemove);
      });

      favoritesContainer.appendChild(movieDiv);
    });
  }

  function removeFromFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    loadFavorites(); // Recargar la lista de favoritos
  }

  loadFavorites(); // Cargar favoritos al inicio

  // Manejar la búsqueda desde la página de favoritos
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `resultados.html?query=${encodeURIComponent(
        query
      )}`;
    } else {
      alert("Por favor, ingrese un término de búsqueda.");
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `resultados.html?query=${encodeURIComponent(
          query
        )}`;
      } else {
        alert("Por favor, ingrese un término de búsqueda.");
      }
    }
  });
});
