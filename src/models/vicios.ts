import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

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