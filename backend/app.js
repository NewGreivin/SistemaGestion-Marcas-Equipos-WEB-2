// Autor: Greivin Arguedas
import express from "express";
import cors from "cors";
import session from "express-session";
import expressMySQLSession from "express-mysql-session";
import pool from "./src/config/database.js";

import globalErrorHandler from "./src/middlewares/errorHandler.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import usuariosRoutes from "./src/routes/users.routes.js";
import configRoutes from "./src/routes/config.routes.js";
import prestamoRoutes from "./src/routes/prestamo.routes.js";
import devolucionRoutes from "./src/routes/devolucion.routes.js";
import historialRoutes from "./src/routes/historial.routes.js";
import equiposRoutes from "./src/routes/equipos.routes.js";
import dispositivosRoutes from "./src/routes/dispositivos.routes.js";
import departamentoRoutes from "./src/routes/departamento.routes.js";
import reporteRoutes from "./src/routes/reporte.routes.js";
import marcasRoutes from "./src/routes/marcas.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['X-Renewed-Token'],
}));

app.use(express.json());

app.use(express.static("public"));

const MySQLStore = expressMySQLSession(session);
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutos
    expiration: 86400000
}, pool);

app.use(session({
    key: 'gestion_session',
    secret: process.env.SESSION_SECRET,
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
app.use("/api/prestamos", prestamoRoutes);
app.use("/api/devoluciones", devolucionRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/dispositivos", dispositivosRoutes);
app.use("/api/departamentos", departamentoRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/marcas", marcasRoutes);

app.use(globalErrorHandler);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API sistema de gestion funcionando correctamente."
    });
});

export default app;