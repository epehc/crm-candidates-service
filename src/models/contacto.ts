import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

class Contacto extends Model {}

Contacto.init(
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
        parentezco: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trabajo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Contacto",
        tableName: "contactos",
        timestamps: false,
    }
);

export default Contacto;