const express = require("express");
const path = require("path");

const app = express();

// Configuración de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Sirve archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "../public"))); // Cambiado "../public" a "public"

// Rutas de la API
app.get("/api/movies", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=ed580b25b58102be44c94151cda257c0`
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const data = await response.json();
    const movies = data.results.slice(0, 50);
    res.json(movies);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({
      error: "Hubo un problema al conectar con la API de películas",
    });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed580b25b58102be44c94151cda257c0`
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const movie = await response.json();
    res.json(movie);
  } catch (error) {
    console.error("Error al obtener detalles de la película:", error);
    res.status(500).json({
      error:
        "Hubo un problema al conectar con la API de detalles de la película",
    });
  }
});

app.get("/api/search", async (req, res) => {
  const searchQuery = req.query.query || "";
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ed580b25b58102be44c94151cda257c0&query=${encodeURIComponent(
        searchQuery
      )}`
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const data = await response.json();
    const movies = data.results.slice(0, 50);
    res.json(movies);
  } catch (error) {
    console.error("Error al buscar películas:", error);
    res.status(500).json({
      error: "Hubo un problema al conectar con la API de búsqueda de películas",
    });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
