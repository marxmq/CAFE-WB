const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(express.static(__dirname, {
    maxAge: '1d',
    immutable: true
}));

app.use(cors());
app.use(express.json());

const pgPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'coffee_shop',
    password: '003658aM.',
    port: 5432,
});

app.get('/api/sql/menu', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM menu'); 
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Помилка підключення до бази даних");
    }
});
app.get('/', (req, res) => {
    res.send('Бекенд сервер кав’ярні працює і готовий до роботи!');
});

app.listen(port, () => {
    console.log(`Сервер кав'ярні запущено на http://localhost:${port}`);
});