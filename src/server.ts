import express from 'express';
import authRoutes from './routes/authRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

app.use(express.json());

app.use(authRoutes);

app.use('/transactions', transactionRoutes);

app.get('/health', (req, res) => {
    return res.json({status: 'ok', message: 'API running smoothly'});
});

app.listen(3333, () => {
    console.log('Server running on http://localhost:3333');
});


