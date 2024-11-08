const apiKey = "ed580b25b58102be44c94151cda257c0";
const baseUrl = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  try {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener películas:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al buscar películas:", error);
    throw error;
  }
};
