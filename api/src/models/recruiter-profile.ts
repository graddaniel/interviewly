import {
    DataTypes,
    Model
} from 'sequelize';
import { ProfileTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';


const NAME_MAX_LENGTH = 32;
const SURNAME_MAX_LENGTH = 32;

export default class RecruiterProfile extends Model {
    declare role: ProfileTypes.Role;
    declare name: string;
    declare surname: string;
    declare gender: ProfileTypes.Gender;
    declare nationality: ProfileTypes.Nationality;
    declare sector: ProfileTypes.Sector;
    declare avatarUrl: string;
    declare phoneNumber: string;
};

RecruiterProfile.init({
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
        type: DataTypes.ENUM(...Object.values(ProfileTypes.Sector)),
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