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
            allowNull: false,
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        software: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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