/// <reference path="../node_modules/@epehc/sharedutilities/types/express.d.ts" />


import express from "express";
import bodyParser from "body-parser";
import sequelize from "./database/db";
import candidatoRoutes from "./routes/candidatoRoutes";
import contactoRoutes from "./routes/contactoRoutes";
import estudioRoutes from "./routes/estudioRoutes";
import experienciaLaboralRoutes from "./routes/experienciaLaboralRoutes";
import informacionPersonalRoutes from "./routes/informacionPersonalRoutes";
import mobilidadRoutes from "./routes/mobilidadRoutes";
import residenciaRoutes from "./routes/residenciaRoutes";
import viciosRoutes from "./routes/viciosRoutes";
import {setupSwagger} from './utils/swagger';
import cors from "cors";

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL, //frontend's URL
    credentials: true, // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
setupSwagger(app);

app.use("/candidatos", candidatoRoutes);
app.use("/contactos", contactoRoutes);
app.use("/estudios", estudioRoutes);
app.use("/experiencias-laborales", experienciaLaboralRoutes);
app.use("/informaciones-personales", informacionPersonalRoutes);
app.use("/mobilidades", mobilidadRoutes);
app.use("/residencias", residenciaRoutes);
app.use("/vicios", viciosRoutes)

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to the database in the background
sequelize
    .sync()
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.error("Failed to connect to database:", err);
        server.close(); // Stop the server if the DB fails
    });