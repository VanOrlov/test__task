const Article = require("../../models/article");

//Создание новой статьи
const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: "Не удалось создать статью" });
  }
};

//Получение статьи по id
const getAtricleId = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByPk(id).then((article) => {
      if (!article) {
        res.status(404).json({ error: "Статья не найдена" });
      } else {
        res.status(200).json(article);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// Получение всех статей
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
    console.log(error);
  }
};

// Обновление статьи по ID
const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const updatedAt = Date.now()
  Article.update({ title, text, updatedAt }, { where: { id } })
    .then(([updatedRows]) => {
      if (updatedRows === 0) {
        res.status(404).json({ error: "Статья не найдена" });
      } else {
        res.status(200).json({ message: "Статья обновлена" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Ошибка сервера" });
    });
};

module.exports = {
  getAllArticles,
  createArticle,
  getAtricleId,
  updateArticle,
};
