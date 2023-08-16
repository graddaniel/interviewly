import {
    BelongsToCreateAssociationMixin,
    DataTypes,
    Model,
} from 'sequelize';
import { ProjectTypes } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';
import { UUID_V4_LENGTH } from '../consts';

import type CompanyModel from './company';

const TEMPLATE_NAME_LENGTH = 64;

export default class Template extends Model {
    declare id: number;
    declare uuid: string;
    name: string;
    templateJson: any;

    declare getCompany: BelongsToCreateAssociationMixin<CompanyModel>;
};

Template.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(TEMPLATE_NAME_LENGTH),
        allowNull: false,
    },
    templateJson: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    isPrivate: {
        type: DataTypes.VIRTUAL,
        get() {
            //@ts-ignore
            return !!this.CompanyId;
        },
        set(value) {
          throw new Error('Disabled!');
        }
    }
}, {
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});