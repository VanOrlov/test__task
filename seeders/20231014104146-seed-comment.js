'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comment', [
      {
        text: 'Текст статьи 1',
        articleId: 1,
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        text: 'Текст статьи 2',
        articleId: 2,
        createdAt: new Date(),
        updatedAt: null,
      },
      // Добавьте другие записи здесь
    ], {
      raw: true, // Установите raw: true для соблюдения значений allowNull
    }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
