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
      "https://magicloops.dev/api/loop/run/9b295e32-fe0f-49b8-a5d4-fda5bcbe5154?input=I+love+Magic+Loops%21"
    );

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const data = await response.json();
    const movies = data.results ? data.results.slice(0, 50) : []; // Obtener las primeras 50 películas
    res.json(movies);
  } catch (error) {
    console.error("Error al conectar con la API de películas:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al conectar con la API de películas" });
  }
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
