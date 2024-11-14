import {DataTypes, Model} from "sequelize";
import sequelize from "../database/db";


class Candidato extends Model {}

Candidato.init(
    {
        candidato_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        puesto_aplicado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        como_se_entero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono_whatsapp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aspiracion_salarial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Candidato",
        tableName: "candidatos",
        timestamps: false,
    }
)

export default Candidato;