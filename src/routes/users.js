const connection = require('./connection');
const Sequelize = require('sequelize');

const users = connection.define("users",{
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.DataTypes.STRING,
    fullname: Sequelize.DataTypes.TEXT,
    surname: Sequelize.DataTypes.TEXT,
    email: Sequelize.DataTypes.TEXT,
    address: Sequelize.DataTypes.TEXT,
    mobile: Sequelize.DataTypes.INTEGER,
    password: Sequelize.DataTypes.TEXT,
    is_deleted: Sequelize.DataTypes.BOOLEAN,
    is_admin: Sequelize.DataTypes.BOOLEAN
},{});

module.exports = users;