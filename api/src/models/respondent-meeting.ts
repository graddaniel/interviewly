import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';


export default class RespondentMeeting extends Model {
    declare id: number;
};

RespondentMeeting.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});