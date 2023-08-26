import {
    DataTypes,
    Model
} from 'sequelize';
import { AccountTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import PasswordResetRequestModel from './password-reset-request';
import RecruiterProfileModel from './recruiter-profile';
import RespondentProfileModel from './respondent-profile';
import { UUID_V4_LENGTH } from '../consts';


const PASSWORD_LENGTH = 64; //SHA256; update this in migrations ALSO
const EMAIL_MAX_LENGTH = 64;

export default class Account extends Model {
    declare id: number;
    declare uuid: string;
    declare email: string;
    declare passwordHash: string;
    declare type: AccountTypes.Type;
    declare status: AccountTypes.Status;
    declare newsletter: boolean;

    declare RespondentProfile: RespondentProfileModel;
    declare RecruiterProfile: RecruiterProfileModel;
}

Account.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(EMAIL_MAX_LENGTH),
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING(PASSWORD_LENGTH),
    },
    type: {
        type: DataTypes.ENUM(...Object.values(AccountTypes.Type)),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(AccountTypes.Status)),
        allowNull: false,
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }, {
        unique: true,
        fields: ['email'],
    }],
});

Account.associations.PasswordResetRequestModel = Account.hasMany(PasswordResetRequestModel, { onDelete: 'CASCADE' });
PasswordResetRequestModel.associations.AccountModel = PasswordResetRequestModel.belongsTo(Account, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Account.associations.RecruiterProfileModel = Account.hasOne(RecruiterProfileModel, { onDelete: 'CASCADE' });
RecruiterProfileModel.associations.AccountModel = RecruiterProfileModel.belongsTo(Account, { onDelete: 'CASCADE' });

Account.associations.RespondentProfileModel = Account.hasOne(RespondentProfileModel, { onDelete: 'CASCADE' });
RespondentProfileModel.associations.AccountModel = RespondentProfileModel.belongsTo(Account, { onDelete: 'CASCADE' });