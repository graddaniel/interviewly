import { Sequelize, Model, DataTypes } from 'sequelize'; 


const MAX_USERNAME_LENGTH = 32;
const MAX_PASSWORD_LENGTH = 32;

export enum JOB_STATUS {
    STARTED = 'STARTED',
    FINISHED = 'FINISHED',
};

class LimeSurveyAccountCreationJob extends Model {
    declare id: number;
    declare username: string;
    declare password: string;
    declare jobStatus: JOB_STATUS;
}

async function setupSequelizeConnection () {
    const sequelize = new Sequelize('mysql://user:password@localhost:3306/interviewly');

    LimeSurveyAccountCreationJob.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(MAX_USERNAME_LENGTH),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(MAX_PASSWORD_LENGTH),
            allowNull: false,
        },
        jobStatus: {
            type: DataTypes.ENUM(...Object.values(JOB_STATUS)),
            allowNull: false,
        }
    }, {
        sequelize,
        indexes: [{ unique: true, fields: ['username'] }]
    });

    await sequelize.sync();
}

setupSequelizeConnection();

export default LimeSurveyAccountCreationJob;