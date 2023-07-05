import {
    DataTypes,
    Model
} from 'sequelize';
import { ProfileTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import AddressModel from './address';


const NAME_MAX_LENGTH = 32;
const SURNAME_MAX_LENGTH = 32;

export default class RespondentProfile extends Model {
    declare name: string;
    declare surname: string;
    declare gender: ProfileTypes.Gender;
    declare avatarUrl: string;
    declare phoneNumber: string;
    declare bankAccountNumber: number;
    /**
-zgody - FK
-?rok urodzenia - enum
-?zawód - enum
-?specjalizacja - enum
-?martial status - enum
-?children - bool
-?children count
     */
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
    phoneNumber: {
        type: DataTypes.STRING,
    },
    introductionVideoUrl: {
        type: DataTypes.STRING,
    },
    bankAccountNumber: {
        type: DataTypes.BIGINT,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});

RespondentProfile.associations.AddressModel = RespondentProfile.hasOne(AddressModel);