const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para consumir la API de Magic Loops
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
    const movies = response.data.results; // Aquí estás obteniendo las películas
    res.json(movies);
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
