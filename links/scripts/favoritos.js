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
        Swal.fire({ title: "Se quito de favoritos", icon: "error" });
      });

      favoritesContainer.appendChild(movieDiv);
    });
  }

  function removeFromFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    loadFavorites();
  }

  loadFavorites();

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `resultados.html?query=${encodeURIComponent(
        query,
      )}`;
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
        window.location.href = `resultados.html?query=${encodeURIComponent(
          query,
        )}`;
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
