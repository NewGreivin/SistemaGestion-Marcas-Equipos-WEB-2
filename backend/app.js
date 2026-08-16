// Autor: Greivin Arguedas
import express from "express";
import cors from "cors";
import session from "express-session";
import expressMySQLSession from "express-mysql-session";
import pool from "./src/config/database.js";

import authRoutes from "./src/routes/auth.routes.js";
import usuariosRoutes from "./src/routes/users.routes.js";
import configRoutes from "./src/routes/config.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['X-Renewed-Token'],
}));

app.use(express.json());

// Configuración de almacenamiento de sesiones en MySQL
const MySQLStore = expressMySQLSession(session);
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutos
    expiration: 86400000 // 1 día por defecto
}, pool);

app.use(session({
    key: 'gestion_session',
    secret: process.env.SESSION_SECRET || 'super_secret_key_123',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400000
    }
}));

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/config", configRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API sistema de gestion funcionando correctamente."
    });
});

export default app;