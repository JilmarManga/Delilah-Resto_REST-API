// const sequelize = require('sequelize');
const Sequelize = require('sequelize');

const path = 'Delilah_Resto_API';
const connection = new Sequelize(path,'root','admin',{ //admin debe ser reemplazado por la contraseña correspondiente del workbrenh o Heidi en su computador
    host: 'localhost',
    dialect: 'mysql'
});

connection.authenticate().then(() => {
    console.log('Conectado.');
}).catch(err => {
    console.error('Error de conexion:', err);
}).finally(() => {
    // sequelize.close();
});

module.exports = connection;