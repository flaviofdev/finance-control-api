import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    return res.json({status: 'ok', message: 'API running smoothly'});
});

app.listen(3333, () => {
    console.log('Server running on http://localhost:3333');
});

