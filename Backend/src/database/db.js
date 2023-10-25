const Sequelize = require('sequelize');

const sequelize = new Sequelize('test__posts', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres', // Здесь укажите свою базу данных
});

module.exports = sequelize;