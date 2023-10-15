const Comment = require("../../models/comment");

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

//Получение всех комментов под статьей по внешнему ключу articleId
const getAllComments = (req, res) => {
  const { articleId } = req.params;
  Comment.findAll({ where: { articleId } })
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
  createComment
};
