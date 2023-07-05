import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';
import config from 'config';
import 'dotenv/config';


type DatabaseConfig = {
    username: string;
    password: string;
    host: string;
    port: number;
    name: string;
};

const username = process.env.DATABASE_USER as string;
const password = process.env.DATABASE_PASSWORD as string;
const host = process.env.DATABASE_HOST as string;

const namespace = cls.createNamespace('sequelize');
Sequelize.useCLS(namespace);

export default class SequelizeConnection {
    private static _sequelize: Sequelize;

    private static init = () => {
        const {
            port,
            name,
        } = config.get("database") as DatabaseConfig;

        SequelizeConnection._sequelize = new Sequelize(`mysql://${username}:${password}@${host}:${port}/${name}`, {
            define: {
                underscored: true,
            },
        });

        // to initialize all the models; may be redundant once the app is finished and all models are referenced in services
        const Models = import('../models');
    }

    static instance = () => {
        if (!SequelizeConnection._sequelize) {
            SequelizeConnection.init();
        }

        return SequelizeConnection._sequelize;
    }

    static transaction = <T, A extends any[]>(operation: (...args: A) => Promise<T>) =>
        async function (...args: A): Promise<T> {
            return namespace.get('transaction')
                ? operation(...args)
                : SequelizeConnection._sequelize.transaction(
                    operation.bind(null, ...args)
                );
        }
}