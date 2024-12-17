import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

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