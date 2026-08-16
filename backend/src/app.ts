import express, { Express } from 'express'
import routes from './routes/routes';

const app: Express = express();

app.use(express.json());
app.use(routes)

app.listen(3000, () => {
    console.log('Servidor rodando')
})