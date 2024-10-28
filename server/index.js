const express = require("express");
const path = require("path");
const app = express();

// Middleware para servir archivos estáticos en la carpeta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para consumir la API de películas
app.get("/api/movies", async (req, res) => {
  try {
    // Hacer la solicitud a la API de películas usando fetch
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ed580b25b58102be44c94151cda257c0&page=1"
    );

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const data = await response.json();
    const movies = data.results.slice(2, 50); // Obtener las primeras 50 películas
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
