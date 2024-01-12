import express from 'express';

const app = express();

app.get('/', async (req, res) => {
    return res.send('oi');
});

app.listen(3000);
