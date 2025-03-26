const { Router } = require("express");
import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { cachedData, GetData } from "../DBMethods/Basics";
import { findBarbershop, getBarbershopAdmin, logInUser } from "../DBMethods/Find";
import { ObjectId } from "mongodb";

const router = Router();

configDotenv();

router.get("/alldata", async (req: Request, res: Response) => {
  if (cachedData != null && cachedData.length > 0) {
    return res.json(cachedData);
  }

  try {
    console.log("Cache vazio, buscando dados do banco...");
    const data = await GetData(); // Busca diretamente do banco

    if (data.length === 0) {
      return res.status(404).json({ message: "Nenhum dado encontrado." });
    }
    return res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return res.status(500).json({ message: "Erro ao recuperar os dados." });
  }
});

router.get("/find/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const barber = await findBarbershop(new ObjectId(id));
    console.log(barber);
    res.json(barber);
  } catch (e) {
    console.log(e);
  }
});

router.get("/log-in-admin", async (req: Request, res: Response) => {
  const { email, password } = req.query; // Pega os dados da URL

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios!" });
  }

  const user = await getBarbershopAdmin(email as string, password as string);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado!" });
  }

  res.json(user.barbearia);
});

{
  /*Retorna o Objeto do Usuário contendo
  User.userData  (Todas as informações do Usuário)
  */
}
router.get("/log-in-user", async (req: Request, res: Response) => {
  const { email, password } = req.query; // Pega os dados da URL

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios!" });
  }

  const user = await logInUser(email as string, password as string);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado!" });
  }
  {
    /*Retorna o Objeto do Usuário contendo
    User.userData  (Todas as informações do Usuário)
    */
  }
  res.json(user);
});

module.exports = router;
