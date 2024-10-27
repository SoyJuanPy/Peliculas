function toggleMenu() {
  let burger = document.querySelector(".burger");
  burger.classList.toggle("open");
  const list = document.querySelector(".menu__links");

  list.classList.toggle("menu__links--show");
}
/* peli */
const API_KEY = "ed580b25b58102be44c94151cda257c0";
const MOVIE_API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=" +
  API_KEY +
  "&language=en-US&page=1";

async function fetchMovies() {
  try {
    const response = await fetch(MOVIE_API_URL);
    if (!response.ok) {
      throw new Error("Error fetching movies: " + response.status);
    }
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error(error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";
    movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        
          
        `;
    moviesContainer.appendChild(movieElement);
  });
}

fetchMovies();
