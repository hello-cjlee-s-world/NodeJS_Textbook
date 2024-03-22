const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            user : {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            chat:{
                type: Sequelize.STRING,
            },
            gif:{
                type: Sequelize.STRING,
            },
            created_at : {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }

        },{
            sequelize,
            timestamps: false,
            modelName: 'Chat',
            tableName: 'chats',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
        db.Chat.belongsTo(db.Room, {foreignKey: 'rid', targetKey: 'rid'});
    }
};