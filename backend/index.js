// Autor: Greivin Arguedas

import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto http://localhost:${PORT}`);
});