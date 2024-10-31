const movieId = new URLSearchParams(window.location.search).get("id");
const movieDetailsContainer = document.getElementById("movie-details");

// Función para realizar la búsqueda
function performSearch(query) {
  if (query) {
    window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
  } else {
    alert("Por favor, ingrese un término de búsqueda.");
  }
}

// Evento para el botón de búsqueda
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  performSearch(query);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    performSearch(query);
  }
});

fetch(`http://localhost:3000/api/movies/${movieId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener la información de la película");
    }
    return response.json();
  })
  .then((movie) => {
    const { title, overview, vote_average, popularity, poster_path } = movie;

    movieDetailsContainer.innerHTML = `
    <div class="movie-cards">
      <div class="heart-container">
        <i class="bi bi-suit-heart-fill heart-icon" data-id="${movie.id}"></i>
      </div>
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
      <h1>${title}</h1>
      <p><strong>Descripción:</strong> ${overview}</p>
      <p><strong>Ranking:</strong> ${vote_average}</p>
      <p><strong>Vistas:</strong> ${popularity}</p>
    </div>
  `;

    const heartIcon = movieDetailsContainer.querySelector(".heart-icon");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.some((fav) => fav.id === movie.id)) {
      heartIcon.classList.add("red");
    }

    heartIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      heartIcon.classList.toggle("red");

      const movieExists = favorites.find((fav) => fav.id === movie.id);

      if (!movieExists) {
        favorites.push(movie);
        alert("Se agregó a favoritos");
      } else {
        const index = favorites.findIndex((fav) => fav.id === movie.id);
        favorites.splice(index, 1);
        alert("Se quitó de favoritos");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  })
  .catch((error) =>
    console.error("Error al obtener los detalles de la película:", error)
  );
