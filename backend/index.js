// Autor: Greivin Arguedas

import 'dotenv/config';
import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto http://localhost:${PORT}`);
});