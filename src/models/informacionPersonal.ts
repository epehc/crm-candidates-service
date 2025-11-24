import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     InformacionPersonal:
 *       type: object
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The unique identifier for a candidato
 *         dpi:
 *           type: string
 *           description: The DPI of the candidato
 *         nacionalidad:
 *           type: string
 *           description: The nationality of the candidato
 *         estado_civil:
 *           type: string
 *           description: The marital status of the candidato
 *         religion:
 *           type: string
 *           description: The religion of the candidato
 *         software:
 *           type: string
 *           description: The software skills of the candidato
 *         partido_politico:
 *           type: string
 *           description: The political party affiliation of the candidato
 *         sindicato:
 *           type: string
 *           description: The union affiliation of the candidato
 *         adjetivos:
 *           type: string
 *           description: The adjectives describing the candidato
 *         impedimento_fisico:
 *           type: string
 *           description: Any physical impediments of the candidato
 *         enfermedad:
 *           type: string
 *           description: Any illnesses of the candidato
 *         nivel_estudios:
 *           type: string
 *           description: The education level of the candidato
 *         estudios_adicionales:
 *           type: string
 *           description: Any additional studies of the candidato
 *         idiomas:
 *           type: string
 *           description: The languages spoken by the candidato
 *         personas_dependientes:
 *           type: string
 *           description: The number of dependents of the candidato
 *         fecha_nacimiento:
 *           type: string
 *           description: The birth date of the candidato
 *         edad:
 *           type: string
 *           description: The age of the candidato
 */
class InformacionPersonal extends Model {}

InformacionPersonal.init(
    {
        candidato_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        dpi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nacionalidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado_civil: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        software: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        partido_politico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sindicato: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adjetivos: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        impedimento_fisico: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        enfermedad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nivel_estudios: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estudios_adicionales: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        idiomas: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        personas_dependientes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_nacimiento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        edad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "InformacionPersonal",
        tableName: "informacion_personal",
        timestamps: false,
    }
);

export default InformacionPersonal;