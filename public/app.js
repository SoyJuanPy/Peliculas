function toggleMenu() {
  let burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");

  list.classList.toggle("menu__links--show");
}
fetch("/api/movies")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((movies) => {
    const moviesContainer = document.getElementById("movies-container");

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
