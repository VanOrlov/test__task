const { DataTypes } = require('sequelize');
const sequelize = require('../src/database/db');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false, // Отключить автоматическое установление createdAt и updatedAt
  defaultScope: {
    order: [['id', 'ASC']] // Сортировка по столбцу "id" по возрастанию
  }
});

module.exports = Article;
