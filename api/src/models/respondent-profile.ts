import {
    BelongsToGetAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    Model
} from 'sequelize';
import { ProfileTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import AddressModel from './address';
import type { AccountModel, ProjectModel, RespondentProfileModel, SurveyModel, SurveyParticipantModel } from '.';


const NAME_MAX_LENGTH = 32;
const SURNAME_MAX_LENGTH = 32;

export default class RespondentProfile extends Model {
    declare createdAd: Date;
    declare updatedAt: Date;
    declare id: number;
    declare name: string;
    declare surname: string;
    declare gender: ProfileTypes.Gender;
    declare avatarUrl: string;
    declare hasUploadedCV: boolean;
    declare hasUploadedOtherFiles: boolean;
    declare hasInterviewVideo: boolean;
    declare hasInterviewTranscript: boolean;
    declare phoneNumber: string;
    declare bankAccountNumber: string;
    declare createdFromFile: boolean;
    declare birthYear: number;
    declare province: string;
    declare city: string;
    declare zipCode: string;
    declare street: string;
    declare profession: string;
    declare specialization: string;
    declare martialStatus: ProfileTypes.MartialStatus;
    declare hasChildren: boolean;
    declare childrenCount: number;
    declare score: number;

    declare Account: AccountModel;
    declare Surveys: SurveyModel[];
    declare SurveyParticipant: SurveyParticipantModel;
    declare getSurveys: BelongsToManyGetAssociationsMixin<RespondentProfileModel>;
    declare getAccount: BelongsToGetAssociationMixin<AccountModel>;
    declare getProjects: BelongsToManyGetAssociationsMixin<ProjectModel>
};

RespondentProfile.init({
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    name: {
        type: DataTypes.STRING(NAME_MAX_LENGTH),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(SURNAME_MAX_LENGTH),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM(...Object.values(ProfileTypes.Gender)),
        allowNull: false,
    },
    avatarUrl: {
        type: DataTypes.STRING,
    },
    hasUploadedCV: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    hasUploadedOtherFiles: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    hasInterviewVideo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    hasInterviewTranscript: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
    },
    createdFromFile: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    birthYear: {
        type: DataTypes.SMALLINT,
    },
    province: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    zipCode: {
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
    },
    profession: {
        type: DataTypes.STRING,
    },
    specialization: {
        type: DataTypes.STRING,
    },
    martialStatus: {
        type: DataTypes.ENUM(...Object.values(ProfileTypes.MartialStatus)),
    },
    hasChildren: {
        type: DataTypes.BOOLEAN,
    },
    childrenCount: {
        type: DataTypes.SMALLINT,
    },
    score: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});

RespondentProfile.associations.AddressModel = RespondentProfile.hasOne(AddressModel);