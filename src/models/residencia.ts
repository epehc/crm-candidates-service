import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

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