const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

// Ruta para consumir la API de películas
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: "ed580b25b58102be44c94151cda257c0",
          page: 1,
        },
      }
    );

    console.log(response.data); // Para verificar la estructura de la respuesta en la consola

    // Asegúrate de que 'results' exista antes de usar 'slice'
    const movies = response.data.results
      ? response.data.results.slice(0, 50)
      : [];
    if (!movies.length) {
      console.error("No se encontraron películas en la respuesta.");
    }

    res.json(movies); // Enviar las películas como respuesta
  } catch (error) {
    console.error("Error al conectar con la API de películas:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al conectar con la API de películas" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
