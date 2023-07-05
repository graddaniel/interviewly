import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import AddressModel from './address';
import RecruiterProfileModel from './recruiter-profile';


export default class Company extends Model {
    id: number | null;
    name: string;
    taxNumber: string;
};

Company.init({
    name: {
        type: DataTypes.STRING,
    },
    taxNumber: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
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