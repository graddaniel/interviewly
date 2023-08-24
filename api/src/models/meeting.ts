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

    declare addRespondentProfile: HasManyAddAssociationMixin<RespondentProfileModel, RespondentProfileModel['id']>;
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
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

ProjectModel.associations.MeetingModel = ProjectModel.hasMany(Meeting, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'cascade'
});
Meeting.associations.ProjectModel = Meeting.belongsTo(ProjectModel, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'cascade'
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