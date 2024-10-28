const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

// Sirve archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para consumir la API de TMDB
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://magicloops.dev/api/loop/run/9b295e32-fe0f-49b8-a5d4-fda5bcbe5154?input=I+love+Magic+Loops%21",
      {
        params: {
          api_key: "ed580b25b58102be44c94151cda257c0", // Cambia esto por tu API key
          page: 1,
        },
      }
    );
    const movies = response.data.results.slice(0, 50); // Obtener las primeras 50 películas
    res.json(movies);
  } catch (error) {
    console.error("Error al conectar con la API de películas:", error);
    res
      .status(500)
      .json({ error: "Error al conectar con la API de películas" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
