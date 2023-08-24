import {
    DataTypes,
    Model
} from 'sequelize';

import { UUID_V4_LENGTH } from '../consts';
import SequelizeConnection from '../services/sequelize-connection';
import RespondentProfileModel from './respondent-profile';
import SurveyParticipantModel from './survey-participant';
import type { ProjectModel } from '.';

const SURVEY_NAME_LENGTH = 64;

export default class Survey extends Model {
    declare id: number;
    declare uuid: string;
    name: string;
    templateJson: any;
    startDate: Date;
    endDate: Date;

    declare RespondentProfiles: RespondentProfileModel[];
    declare Project: ProjectModel;
};

Survey.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(SURVEY_NAME_LENGTH),
        allowNull: false,
    },
    templateJson: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

Survey.associations.RespondentProfileModel = Survey.belongsToMany(
    RespondentProfileModel,
    { through: SurveyParticipantModel }
);
RespondentProfileModel.associations.SurveyModel = RespondentProfileModel.belongsToMany(
    Survey,
    { through: SurveyParticipantModel },
);
Survey.associations.SurveyParticipantModel = Survey.hasMany(SurveyParticipantModel);
SurveyParticipantModel.associations.SurveyModel = SurveyParticipantModel.belongsTo(Survey);