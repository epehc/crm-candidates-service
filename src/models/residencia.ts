import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Residencia:
 *       type: object
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The unique identifier for a candidato
 *         vive_con:
 *           type: string
 *           description: The people the candidato lives with
 *         calle:
 *           type: string
 *           description: The street of the candidato's residence
 *         zona:
 *           type: string
 *           description: The zone of the candidato's residence
 *         municipio:
 *           type: string
 *           description: The municipality of the candidato's residence
 *         departamento:
 *           type: string
 *           description: The department of the candidato's residence
 *         pais_de_residencia:
 *           type: string
 *           description: The country of the candidato's residence
 */
class Residencia extends Model {}

Residencia.init(
    {
        candidato_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        vive_con: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zona: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        municipio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departamento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pais_de_residencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Residencia",
        tableName: "residencia",
        timestamps: false,
    }
);

export default Residencia;