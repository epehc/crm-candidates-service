import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Mobilidad:
 *       type: object
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The unique identifier for a candidato
 *         licencia:
 *           type: string
 *           description: The license of the candidato
 *         licencia_tipo:
 *           type: string
 *           description: The type of license
 *         licencia_fecha_expiracion:
 *           type: string
 *           description: The expiration date of the license
 *         tiempo_conduciendo:
 *           type: string
 *           description: The time spent driving
 *         vehiculo:
 *           type: string
 *           description: The vehicle of the candidato
 *         vehiculo_tipo:
 *           type: string
 *           description: The type of vehicle
 *         vehiculo_modelo:
 *           type: string
 *           description: The model of the vehicle
 *         viaje_interior:
 *           type: string
 *           description: The willingness to travel domestically
 *         viaje_exterior:
 *           type: string
 *           description: The willingness to travel internationally
 */
class Mobilidad extends Model {}

Mobilidad.init(
    {
        candidato_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        licencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        licencia_tipo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licencia_fecha_expiracion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tiempo_conduciendo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehiculo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehiculo_tipo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehiculo_modelo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        viaje_interior: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        viaje_exterior: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Mobilidad",
        tableName: "mobilidad",
        timestamps: false,
    }
);

export default Mobilidad;