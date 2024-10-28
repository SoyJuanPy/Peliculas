const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../public"))); // Sirve archivos estáticos desde la carpeta public

// Ruta para consumir la API de películas
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: "ed580b25b58102be44c94151cda257c0", // Usa tu API key
          page: 1,
        },
      }
    );
    const movies = response.data.results.slice(0, 50); // Obtener las primeras 50 películas
    res.json(movies);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Hubo un problema al conectar con la API de películas" });
  }
});

// Escucha en el puerto definido por Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
