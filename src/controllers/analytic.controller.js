const Comment = require("../../models/comment");
const { Op } = require('sequelize');

const getCommentsAnalytics = (req, res) => {
  const { dateFrom, dateTo } = req.query; // Получаем даты из параметров запроса
  Comment.findAll({
    where: {
      createdAt: {
        [Op.between]: [new Date(dateFrom * 1000).toISOString().replace('Z', '+03:00'), new Date(dateTo * 1000).toISOString().replace('Z', '+03:00')],
      },
    }
  })
  .then((comments) => {
    console.log(new Date(dateTo * 1000).toISOString().replace('Z', '+03:00'));
    res.status(200).json(comments);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  });
};

module.exports = {
  getCommentsAnalytics,
};
