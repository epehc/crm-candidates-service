import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Vicios:
 *       type: object
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The unique identifier for a candidato
 *         fuma:
 *           type: string
 *           description: Indicates if the candidato smokes
 *         alcohol:
 *           type: string
 *           description: Indicates if the candidato consumes alcohol
 *         alcohol_frecuencia:
 *           type: string
 *           description: The frequency of alcohol consumption
 *         drogas:
 *           type: string
 *           description: Indicates if the candidato uses drugs
 *         tatuajes:
 *           type: string
 *           description: Indicates if the candidato has tattoos
 */
class Vicios extends Model {}

Vicios.init(
    {
        candidato_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        fuma: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcohol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcohol_frecuencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        drogas: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tatuajes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Vicios",
        tableName: "vicios",
        timestamps: false,
    }
);

export default Vicios;