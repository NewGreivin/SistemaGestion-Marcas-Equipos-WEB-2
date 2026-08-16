// Autor: Greivin Arguedas

import express from "express";
import cors from "cors";

//import userEjemplo from "./src/routes/userEjemplo.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Renewed-Token'],
}));

app.use(express.json());

//app.use("/api/v0/ejemplo", userEjemplo);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API sistema de gestion funcionando correctamente."
    });
});

export default app;