import {
    DataTypes,
    HasOneGetAssociationMixin,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import AddressModel from './address';
import RecruiterProfileModel from './recruiter-profile';
import ProjectModel from './project';

const UUID_V4_LENGTH = 40;

export default class Company extends Model {
    declare id: number | null;
    declare uuid: string;
    declare name: string;
    declare taxIdNumber: string;

    declare getAddress: HasOneGetAssociationMixin<AddressModel>;
};

Company.init({
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    taxIdNumber: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

Company.associations.AddressModel = Company.hasOne(AddressModel);
Company.associations.RecruiterProfileModel = Company.hasMany(RecruiterProfileModel, {
    foreignKey: {
        allowNull: false,
    }
});
RecruiterProfileModel.associations.CompanyModel = RecruiterProfileModel.belongsTo(Company, {
    foreignKey: {
        allowNull: false,
    }
});
Company.associations.ProjectModel = Company.hasMany(ProjectModel, {
    foreignKey: {
        allowNull: false,
    }
});
ProjectModel.associations.CompanyModel = ProjectModel.belongsTo(Company, {
    foreignKey: {
        allowNull: false,
    }
})