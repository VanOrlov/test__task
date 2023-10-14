'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Articles', [
      {
        title: 'Заголовок статьи 1',
        text: 'Содержание статьи 1',
        createdAt: new Date(),
        updatedAt: undefined,
      },
      {
        title: 'Заголовок статьи 2',
        text: 'Содержание статьи 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Добавьте другие записи здесь
    ], {
      raw: true, // Установите raw: true для соблюдения значений allowNull
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
