const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            rid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            title : {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: false
            },
            max : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            owner : {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            password : {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            created_at : {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Room',
            tableName: 'rooms',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db){
        db.Room.hasOne(db.Chat, {foreignKey: 'rid', targetKey: 'rid'});
    }
};