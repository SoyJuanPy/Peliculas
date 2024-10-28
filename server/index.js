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
          api_key: "ed580b25b58102be44c94151cda257c0", // Cambia esto por tu API key
          page: 1,
        },
      }
    );
    const movies = response.data.results.slice(2, 20); // Obtener solo las primeras 50 películas
    res.json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un problema al conectar con la API de películas" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
