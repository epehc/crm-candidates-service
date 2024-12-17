import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudio:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an estudio
 *         candidato_id:
 *           type: string
 *           description: The ID of the associated candidato
 *         institucion:
 *           type: string
 *           description: The institution where the estudio was completed
 *         titulo:
 *           type: string
 *           description: The title of the estudio
 *         grado:
 *           type: string
 *           description: The grade of the estudio
 */
class Estudio extends Model {}

Estudio.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        candidato_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        institucion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Estudio",
        tableName: "estudios",
        timestamps: false,
    }
);

export default Estudio;