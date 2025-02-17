import express, { Request, Response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
const authRouter = require('./Routes/Auth')
const getterRouter = require('./Routes/Getters')
import { createServico } from './DbMethods';
dotenv.config(); // Carregar variáveis do .env

const app = express();
const port = 3000;

app.use(express.json());

// Conectar ao MongoDB


app.get('/', async (req: Request, res: Response) => {
  res.send("Conectado")
});

app.use('/', authRouter);
app.use('/', getterRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

