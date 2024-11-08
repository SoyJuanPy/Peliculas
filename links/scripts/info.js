function toggleMenu() {
  const burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");
  list.classList.toggle("menu__links--show");
}

const movieId = new URLSearchParams(window.location.search).get("id");
const movieDetailsContainer = document.getElementById("movie-details");

function performSearch(query) {
  if (query) {
    window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
  } else {
    Swal.fire({
      title: "Upps",
      text: "Por favor, ingrese un térmno de búsqueda.",
      icon: "question",
    });
  }
}

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

const apiKey = "ed580b25b58102be44c94151cda257c0";
const baseUrl = "https://api.themoviedb.org/3";

fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
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
        Swal.fire({ title: "Se agrego a favoritos", icon: "success" });
      } else {
        const index = favorites.findIndex((fav) => fav.id === movie.id);
        favorites.splice(index, 1);
        Swal.fire({ title: "Se quito de favoritos", icon: "error" });
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  })
  .catch((error) =>
    console.error("Error al obtener los detalles de la película:", error),
  );
