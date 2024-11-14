import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

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
            allowNull: true,
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        software: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        partido_politico: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sindicato: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        adjetivos: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        impedimento_fisico: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        enfermedad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nivel_estudios: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estudios_adicionales: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idiomas: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        personas_dependientes: {
            type: DataTypes.STRING,
            allowNull: true,
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