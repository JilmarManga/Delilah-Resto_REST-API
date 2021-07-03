const connection = require('./connection');
const Sequelize = require('sequelize');

const productOrder = connection.define("order_details",{
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: Sequelize.DataTypes.INTEGER,
    product_id: Sequelize.DataTypes.INTEGER,
    quantity: Sequelize.DataTypes.INTEGER,
},{});

module.exports = productOrder;