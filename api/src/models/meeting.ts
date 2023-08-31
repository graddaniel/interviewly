import {
    DataTypes,
    HasManyAddAssociationMixin,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import { UUID_V4_LENGTH } from '../consts';
import ProjectModel from './project';
import RespondentProfileModel from './respondent-profile';
import RespondentMeetingModel from './respondent-meeting';


export default class Meeting extends Model {
    declare id: number;
    declare uuid: string;
    declare date: Date;
    declare recordingAvailable: boolean;
    declare hasFinished: boolean;

    declare addRespondentProfile: HasManyAddAssociationMixin<RespondentProfileModel, RespondentProfileModel['id']>;
    declare RespondentProfiles: RespondentProfileModel[];
    declare Project: ProjectModel;
};

Meeting.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
    },
    recordingAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    hasFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

Meeting.associations.RespondentProfileModel = Meeting.belongsToMany(
    RespondentProfileModel,
    {
        through: RespondentMeetingModel,
    },
);
RespondentProfileModel.associations.MeetingModel = RespondentProfileModel.belongsToMany(
    Meeting,
    {
        through: RespondentMeetingModel,
    },
);

Meeting.associations.RespondentMeetingModel = Meeting.hasMany(RespondentMeetingModel);