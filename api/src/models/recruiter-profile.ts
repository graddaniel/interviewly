import {
    BelongsToGetAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    DataTypes,
    Model
} from 'sequelize';
import { ProfileTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import type CompanyModel from './company';
import type ProjectModel from './project';


const NAME_MAX_LENGTH = 32;
const SURNAME_MAX_LENGTH = 32;

export default class RecruiterProfile extends Model {
    declare createdAd: Date;
    declare updatedAt: Date;
    declare id: number;
    declare role: ProfileTypes.Role;
    declare name: string;
    declare surname: string;
    declare gender: ProfileTypes.Gender;
    declare nationality: ProfileTypes.Nationality;
    declare sector: string;
    declare avatarUrl: string;
    declare phoneNumber: string;

    declare CompanyId?: number;

    declare Company: CompanyModel;
    declare getCompany: BelongsToGetAssociationMixin<CompanyModel>;
    declare setProjects: BelongsToManySetAssociationsMixin<ProjectModel, ProjectModel['id']>;
    declare getProjects: BelongsToManyGetAssociationsMixin<ProjectModel>;
};

RecruiterProfile.init({
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
    role: {
        type: DataTypes.ENUM(...Object.values(ProfileTypes.Role)),
        allowNull: false,
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
    nationality: {
        type: DataTypes.ENUM(...Object.values(ProfileTypes.Nationality)),
    },
    sector: {
        type: DataTypes.STRING,
    },
    avatarUrl: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});