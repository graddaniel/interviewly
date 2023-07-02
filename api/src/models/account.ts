import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import ResetRequestModel from './reset-request';


const UUID_V4_LENGTH = 40;
const NAME_MAX_LENGTH = 32;
const SURNAME_MAX_LENGTH = 32;
const PASSWORD_LENGTH = 64; //SHA256
const EMAIL_MAX_LENGTH = 64;

enum Role {
    RECRUITER = 'recruiter',
    RESPONDENT = 'respondent',
};

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
};

export default class AccountModel extends Model {
    declare id: number;
    declare uuid: string;
    declare name: string;
    declare surname: string;
    declare role: Role;
    declare passwordHash: Gender;
    declare email: string;
    declare confirmed: boolean;
    declare reset_request: ResetRequestModel;
}

AccountModel.init({
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
    name: {
        type: DataTypes.STRING(NAME_MAX_LENGTH),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(SURNAME_MAX_LENGTH),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('recruiter', 'respondent'),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING(PASSWORD_LENGTH),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(EMAIL_MAX_LENGTH),
        allowNull: false,
        unique: true,
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    modelName: 'account',
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

AccountModel.hasMany(ResetRequestModel);
ResetRequestModel.belongsTo(AccountModel, {
    foreignKey: {
        allowNull: false,
    }
});