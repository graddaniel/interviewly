import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';


export default class Address extends Model {
    declare id: number;
    declare country: string;
    declare region: string;
    declare city: string;
    declare street: string;
    declare buildingNumber: string;
    declare unitNumber: string;
    declare postalCode: string;
};

Address.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    postalCode: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    region: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
    },
    buildingNumber: {
        type: DataTypes.STRING,
    },
    unitNumber: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});