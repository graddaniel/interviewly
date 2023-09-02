import {
    DataTypes,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    Model,
} from 'sequelize';
import { ProjectTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import RecruiterProfileModel from './recruiter-profile';
import RespondentProfileModel from './respondent-profile';
import SurveyModel from './survey';
import { UUID_V4_LENGTH } from '../consts';
import CompanyModel from './company';
import MeetingModel from './meeting';


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

    declare Company: CompanyModel;
    declare addRespondentProfiles: HasManyAddAssociationsMixin<RespondentProfileModel, RespondentProfileModel['id']>;
    declare getRespondentProfiles: HasManyGetAssociationsMixin<RespondentProfileModel>;
    declare getRecruiterProfiles: HasManyGetAssociationsMixin<RecruiterProfileModel>;
    declare getMeetings: HasManyGetAssociationsMixin<MeetingModel>;
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

Project.associations.MeetingModel = Project.hasMany(MeetingModel, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'cascade'
});
MeetingModel.associations.ProjectModel = MeetingModel.belongsTo(Project, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'cascade'
});

Project.associations.RespondentProfileModel = Project.belongsToMany(
    RespondentProfileModel,
    { through: 'ProjectsRespondents' },
);
RespondentProfileModel.associations.ProjectModel = RespondentProfileModel.belongsToMany(
    Project,
    { through: 'ProjectsRespondents' },
);

Project.associations.RecruiterProfileModel = Project.belongsToMany(
    RecruiterProfileModel,
    { through: 'ProjectsRecruiters' },
);
RecruiterProfileModel.associations.ProjectModel = RecruiterProfileModel.belongsToMany(
    Project,
    { through: 'ProjectsRecruiters' },
);

Project.associations.SurveyModel = Project.hasMany(SurveyModel, {
    foreignKey: {
        allowNull: false,
    },
});
SurveyModel.associations.ProjectModel = SurveyModel.belongsTo(Project);
