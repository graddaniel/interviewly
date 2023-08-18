import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';


export default class SurveyParticipant extends Model {
    declare id: number;
    declare hasFinished: boolean;
    templateJson: any;
};

SurveyParticipant.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hasFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});