import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

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