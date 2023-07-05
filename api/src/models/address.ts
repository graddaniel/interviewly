import {
    DataTypes,
    Model
} from 'sequelize';
import { countries } from 'shared';

import SequelizeConnection from '../services/sequelize-connection';


export default class Address extends Model {
    declare id: number;
    postCode: string;
    country: string;
    region: string;
    city: string;
    street: string;
    number: string;
};

Address.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    postCode: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.ENUM(...countries.map(c => c.rawName)),
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
    number: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});