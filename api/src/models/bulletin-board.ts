import {
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import RespondentProfileModel from './respondent-profile';
import RecruiterProfileModel from './recruiter-profile';
import { UUID_V4_LENGTH } from '../consts';


export class BulletinBoard extends Model {
    declare id: number;
    declare uuid: string;
    declare startDate: Date;
    declare endDate: Date;

    declare BulletinBoardRooms: BulletinBoardRoom[];
    declare getBulletinBoardRoom: HasManyGetAssociationsMixin<BulletinBoardRoom>;
    declare addBulletinBoardRoom: HasManyAddAssociationMixin<BulletinBoardRoom, BulletinBoardRoom["id"]>;
};

export class BulletinBoardRoom extends Model {
    declare id: number;
    declare uuid: string;
    declare name: string;

    declare addRespondentProfiles: BelongsToManyAddAssociationsMixin<RespondentProfileModel, RespondentProfileModel["id"]>;
    declare getRespondentProfiles: BelongsToManyGetAssociationsMixin<RespondentProfileModel>;
    declare getBulletinBoardThreads: HasManyGetAssociationsMixin<BulletinBoardThread>;
    declare addBulletinBoardThread: HasManyAddAssociationMixin<BulletinBoardThread, BulletinBoardThread["id"]>;
};
export class BulletinBoardRoomRespondent extends Model {
    declare id: number;
};

export class BulletinBoardThread extends Model {
    declare id: number;
    declare uuid: string;
    declare message: string;
    declare createdAt: Date;

    declare RecruiterProfile: RecruiterProfileModel;
    declare BulletinBoardResponses: BulletinBoardResponse[];
    declare addBulletinBoardResponse: HasManyAddAssociationMixin<BulletinBoardResponse, BulletinBoardResponse["id"]>;
};

export class BulletinBoardResponse extends Model {
    declare id: number;
    declare message: string;
    declare createdAt: Date;

    declare RecruiterProfile: RecruiterProfileModel;
    declare RespondentProfile: RespondentProfileModel;
};

BulletinBoard.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

BulletinBoardRoom.init({
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
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});
BulletinBoardRoomRespondent.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['bulletin_board_room_id', 'respondent_profile_id'],
        name: 'respondents_RespondentProfileId_BulletinBoardRoomId_unique',
    }],
});

BulletinBoardThread.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(UUID_V4_LENGTH),
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: SequelizeConnection.instance(),
    indexes: [{
        unique: true,
        fields: ['uuid'],
    }],
});

BulletinBoardResponse.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: SequelizeConnection.instance(),
});

BulletinBoard.associations.BulletinBoardRoomModel
    = BulletinBoard.hasMany(BulletinBoardRoom, { onDelete: 'CASCADE' });
BulletinBoardRoom.associations.BulletinBoardModel
    = BulletinBoardRoom.belongsTo(BulletinBoard, { onDelete: 'CASCADE' });

BulletinBoardRoom.associations.BulletinBoardThreadModel
    = BulletinBoardRoom.hasMany(BulletinBoardThread, { onDelete: 'CASCADE' });
BulletinBoardThread.associations.BulletinBoardRoomModel
    = BulletinBoardThread.belongsTo(BulletinBoardRoom, { onDelete: 'CASCADE' });

BulletinBoardRoom.associations.RespondentProfileModel
    = BulletinBoardRoom.belongsToMany(RespondentProfileModel, {
        through: {
            model: BulletinBoardRoomRespondent,
            unique: false
        },
        onDelete: 'CASCADE'
});
RespondentProfileModel.associations.BulletinBoardRoomModel
    = RespondentProfileModel.belongsToMany(BulletinBoardRoom, {
        through: {
            model: BulletinBoardRoomRespondent,
            unique: false
        },
        onDelete: 'CASCADE'
});

BulletinBoardThread.associations.BulletinBoardResponseModel
    = BulletinBoardThread.hasMany(BulletinBoardResponse, { onDelete: 'CASCADE' });
BulletinBoardResponse.associations.BulletinBoardThreadModel
    = BulletinBoardResponse.belongsTo(BulletinBoardThread, { onDelete: 'CASCADE' });

RecruiterProfileModel.associations.BulletinBoardThreadModel
    = RecruiterProfileModel.hasMany(BulletinBoardThread, { onDelete: 'CASCADE' });
BulletinBoardThread.associations.RecruiterProfileModel
    = BulletinBoardThread.belongsTo(RecruiterProfileModel, { onDelete: 'CASCADE' });

RecruiterProfileModel.associations.BulletinBoardResponseModel
    = RecruiterProfileModel.hasMany(BulletinBoardResponse, { onDelete: 'CASCADE' });
BulletinBoardResponse.associations.RecruiterProfileModel
    = BulletinBoardResponse.belongsTo(RecruiterProfileModel, { onDelete: 'CASCADE' });

RespondentProfileModel.associations.BulletinBoardResponseModel
    = RespondentProfileModel.hasMany(BulletinBoardResponse, {
        onDelete: 'CASCADE',
});
BulletinBoardResponse.associations.RespondentProfileModel
    = BulletinBoardResponse.belongsTo(RespondentProfileModel, {
        onDelete: 'CASCADE',
});