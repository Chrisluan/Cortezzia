const { Router } = require("express");
import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { cachedData } from "../DBMethods/Basics";
import { findBarbershop, getBarbershopAdmin } from "../DBMethods/Find";
import { ObjectId } from "mongodb";

const router = Router();

configDotenv();

router.get("/alldata", async (req: Request, res: Response) => {
  if (cachedData != null && cachedData.length > 0) {
    res.json(cachedData);
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


module.exports = router;
