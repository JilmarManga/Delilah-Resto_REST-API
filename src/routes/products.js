const connection = require('./connection');
const Sequelize = require('sequelize');

const products = connection.define("products",{
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.DataTypes.TEXT,
    price: Sequelize.DataTypes.INTEGER,
    picture: Sequelize.DataTypes.TEXT,
},{});

module.exports = products;