import express, { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
const authRouter = require("./Routes/Auth");
const getterRouter = require("./Routes/Getters");
const setterRouter = require("./Routes/Setters");
dotenv.config(); // Carregar variáveis do .env

const app = express();
const port = 3000;
app.use(cors({
  origin: '*',  // Allow requests from your local app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the necessary HTTP methods
  credentials: true
}));
app.use(express.json());

// Conectar ao MongoDB

app.get("/", async (req: Request, res: Response) => {
  res.send("Conectado");
});
app.use("/", authRouter);
app.use("/", getterRouter);
app.use("/", setterRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
