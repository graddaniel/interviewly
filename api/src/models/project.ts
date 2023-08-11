import {
    DataTypes,
    Model,
} from 'sequelize';
import { ProjectTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import { UUID_V4_LENGTH } from '../consts';


const TITLE_LENGTH = 64;
const DESCRIPTION_LENGTH = 512;

export default class Project extends Model {
    declare id: number;
    declare uuid: string;
    declare title: string;
    declare description: string;
    declare methodology: ProjectTypes.Methodology;
    declare participantsCount: number;
    declare reserveParticipantsCount: number;
    declare meetingDuration: ProjectTypes.Duration;
    declare participantsPaymentCurrency: ProjectTypes.PaymentCurrency;
    declare participantsPaymentValue: number;
};

Project.init({
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
    title: {
        type: DataTypes.STRING(TITLE_LENGTH),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(DESCRIPTION_LENGTH),
    },
    methodology: {
        type: DataTypes.ENUM(...Object.values(ProjectTypes.Methodology)),
        allowNull: false,
        defaultValue: ProjectTypes.Methodology.Interview,
    },
    participantsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    reserveParticipantsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    meetingDuration: {
        type: DataTypes.ENUM(...Object.values(ProjectTypes.Duration)),
    },
    participantsPaymentCurrency: {
        type: DataTypes.ENUM(...Object.values(ProjectTypes.PaymentCurrency)),
    },
    participantsPaymentValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: SequelizeConnection.instance(),
});