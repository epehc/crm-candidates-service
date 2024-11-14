import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

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