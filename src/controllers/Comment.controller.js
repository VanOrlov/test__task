const Comment = require("../../models/comment");

//Создание комментария для статьи с articleId(Внешний ключ), текстом и датой создания
const createComment = async (req, res) => {
    try {
        const { articleId } = req.params
        const { text } = req.body
        const createdAt = Date.now()
        const comment = await Comment.create({ text, articleId, createdAt})
        res.status(200).json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ошибка сервера"})
    }
    
}

//Поиск коммента по id в статье с articleId
const getComment = async (req, res) => {
    try {
        const { articleId, id } = req.params
        await Comment.findAll({ where: { articleId }})
        .then(comment => {
            if (comment[id - 1]) {
                res.status(200).json(comment[id - 1])
            } else {
                res.status(404).json({error: "Комментарий не найден"})
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ошибка сервера"})
    }
}

//Получение всех комментов под статьей по внешнему ключу articleId
const getAllComments = async (req, res) => {
  const { articleId } = req.params;
  await Comment.findAll({ where: { articleId }})
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Ошибка сервера" });
    });
};

module.exports = {
  getAllComments,
  createComment,
  getComment
};
