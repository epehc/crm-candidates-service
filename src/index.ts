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


const app = express();

app.use(bodyParser.json());
app.use("/candidatos", candidatoRoutes);
app.use("/contactos", contactoRoutes);
app.use("/estudios", estudioRoutes);
app.use("/experiencias-laborales", experienciaLaboralRoutes);
app.use("/informaciones-personales", informacionPersonalRoutes);
app.use("/mobilidades", mobilidadRoutes);
app.use("/residencias", residenciaRoutes);
app.use("/vicios", viciosRoutes)

const PORT = 4000;

sequelize
    .sync()
    .then(() => {
        console.log("Database connected!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error("Failed to connect to database:", err));
