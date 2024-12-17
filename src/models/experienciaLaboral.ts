import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienciaLaboral:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an experiencia laboral
 *         candidato_id:
 *           type: string
 *           description: The ID of the associated candidato
 *         empresa:
 *           type: string
 *           description: The company where the experiencia laboral was gained
 *         puesto:
 *           type: string
 *           description: The position held during the experiencia laboral
 *         fecha_inicio:
 *           type: string
 *           description: The start date of the experiencia laboral
 *         fecha_fin:
 *           type: string
 *           description: The end date of the experiencia laboral
 *         telefono_empresa:
 *           type: string
 *           description: The phone number of the company
 *         direccion_empresa:
 *           type: string
 *           description: The address of the company
 *         jefe_nombre:
 *           type: string
 *           description: The name of the supervisor
 *         jefe_telefono:
 *           type: string
 *           description: The phone number of the supervisor
 *         motivo_salida:
 *           type: string
 *           description: The reason for leaving the position
 *         responsabilidades:
 *           type: string
 *           description: The responsibilities held during the position
 *         salario:
 *           type: string
 *           description: The salary earned during the position
 */
class ExperienciaLaboral extends Model {}

ExperienciaLaboral.init(
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
        empresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        puesto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono_empresa: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        direccion_empresa: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jefe_nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jefe_telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        motivo_salida: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        responsabilidades: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        salario: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "ExperienciaLaboral",
        tableName: "experiencia_laboral",
        timestamps: false,
    }
);

export default ExperienciaLaboral;