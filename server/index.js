const express = require("express");
const path = require("path");
const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "../public")));
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
    res
      .status(500)
      .json({ error: "Hubo un problema al conectar con la API de películas" });
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
    res.status(500).json({
      error: "Hubo un problema al conectar con la API de búsqueda de películas",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
