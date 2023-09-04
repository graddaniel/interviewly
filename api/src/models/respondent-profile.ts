import {
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    Model
} from 'sequelize';
import { ProfileTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import AddressModel from './address';
import type { AccountModel, RespondentProfileModel, SurveyParticipantModel } from '.';


const NAME_MAX_LENGTH = 32;
const SURNAME_MAX_LENGTH = 32;

export default class RespondentProfile extends Model {
    declare id: number;
    declare name: string;
    declare surname: string;
    declare gender: ProfileTypes.Gender;
    declare avatarUrl: string;
    declare phoneNumber: string;
    declare introductionVideoUrl: string;
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

    declare Account: AccountModel;
    declare SurveyParticipant: SurveyParticipantModel;
    declare getSurveys: BelongsToManyGetAssociationsMixin<RespondentProfileModel>;
};

RespondentProfile.init({
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
    introductionVideoUrl: {
        type: DataTypes.STRING,
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
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});

RespondentProfile.associations.AddressModel = RespondentProfile.hasOne(AddressModel);