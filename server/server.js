const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = "e3c55ad24d104b8c940215558220406";
const apiUrl = "http://api.weatherapi.com/v1/current.json?aqi=no";

app.get('/getWeather', async (req, res) => {

    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Параметр "q" не указан' });
    }

    try {
        const response = await axios.get(`${apiUrl}&key=${apiKey}&q=${q}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при запросе к API погоды' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
