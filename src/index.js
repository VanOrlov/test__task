const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000
const IP_ADDRESS = '192.168.1.2'

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Сервак работает')
})

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Сервер запущен на адресе http://${IP_ADDRESS}:${PORT}`)      
})    