const { DataTypes } = require('sequelize');
const sequelize = require('../src/database/db');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Articles', // Это ссылается на модель статей
      key: 'id',
    },
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
  tableName: 'Comment', // Устанавливаем имя таблицы явным образом
  defaultScope: {
    order: [['id', 'ASC']] // Сортировка по столбцу "id" по возрастанию
  }
});

module.exports = Comment;
