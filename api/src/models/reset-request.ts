import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';


const UUID_V4_LENGTH = 40;

export default class ResetRequestModel extends Model {
    declare id: number;
    declare uuid: string;
    declare updatedAt: Date;
}

ResetRequestModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
        unique: true,
    },
}, {
    modelName: 'reset_requests',
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});