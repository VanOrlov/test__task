const express = require('express')
const cors = require('cors')
const articlesRoutes = require('./routes/Article.routes');
const commentsRoutes = require('./routes/Comment.routes');
const AnalyticRoutes = require('./routes/Analytic.routes');

const app = express()
const PORT = 3000
const IP_ADDRESS = '192.168.1.2'

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Сервак работает')
})

app.use('/api', articlesRoutes);
app.use('/api/article', commentsRoutes);
app.use('/api/analytic/comments', AnalyticRoutes);

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Сервер запущен на адресе http://${IP_ADDRESS}:${PORT}`)      
})    