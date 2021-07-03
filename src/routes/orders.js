const connection = require('./connection');
const Sequelize = require('sequelize');

const orders = connection.define("orders",{
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.DataTypes.INTEGER,
    status_id: Sequelize.DataTypes.INTEGER,
    payment_id: Sequelize.DataTypes.INTEGER,
    total: Sequelize.DataTypes.DECIMAL,
},{});

module.exports = orders;