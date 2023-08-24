import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import { UUID_V4_LENGTH } from '../consts';


export default class PasswordResetRequest extends Model {
    declare id: number;
    declare uuid: string;
    declare updatedAt: Date;
}

PasswordResetRequest.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
}, {
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});