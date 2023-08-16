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
    declare status: ProjectTypes.Status;
    declare participantsCount: number;
    declare reserveParticipantsCount: number;
    declare meetingDuration: ProjectTypes.Duration;
    declare participantsPaymentCurrency: ProjectTypes.PaymentCurrency;
    declare participantsPaymentValue: number;
    declare startDate: Date;
    declare endDate: Date;
    declare avatarUrl: string;
    declare otherRequirements: string;
    declare addLanguageTest: boolean;
    declare addScreeningSurvey: boolean;
    declare requireCandidateRecording: boolean;
    declare transcriptionNeeded: boolean;
    declare moderatorNeeded: boolean;
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
    status: {
        type: DataTypes.ENUM(...Object.values(ProjectTypes.Status)),
        allowNull: false,
        defaultValue: ProjectTypes.Status.Draft,
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
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
    avatarUrl: {
        type: DataTypes.STRING,
    },
    otherRequirements: {
        type: DataTypes.STRING,
    },
    addLanguageTest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    addScreeningSurvey: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    requireCandidateRecording: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    transcriptionNeeded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    moderatorNeeded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});