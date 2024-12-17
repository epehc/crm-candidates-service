import {DataTypes, Model} from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidato:
 *       type: object
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The unique identifier for a candidato
 *         timestamp:
 *           type: string
 *           description: The timestamp of the candidato creation
 *         nombre:
 *           type: string
 *           description: The name of the candidato
 *         puesto_aplicado:
 *           type: string
 *           description: The position applied for by the candidato
 *         como_se_entero:
 *           type: string
 *           description: How the candidato learned about the position
 *         genero:
 *           type: string
 *           description: The gender of the candidato
 *         telefono_whatsapp:
 *           type: string
 *           description: The WhatsApp phone number of the candidato
 *         telefono:
 *           type: string
 *           description: The phone number of the candidato
 *         correo:
 *           type: string
 *           description: The email of the candidato
 *         aspiracion_salarial:
 *           type: string
 *           description: The salary aspiration of the candidato
 */
class Candidato extends Model {}

Candidato.init(
    {
        candidato_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        puesto_aplicado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        como_se_entero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono_whatsapp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aspiracion_salarial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Candidato",
        tableName: "candidatos",
        timestamps: false,
    }
)

export default Candidato;