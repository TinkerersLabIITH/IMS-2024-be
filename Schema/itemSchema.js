import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// schema of the table
const Item = sequelize.define('Item', {
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nameOfItem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noOfItemsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalNumberOfItems: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}); 

// logs of items
const logs = sequelize.define('logs',{
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    rollNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export {Item, logs, sequelize};
