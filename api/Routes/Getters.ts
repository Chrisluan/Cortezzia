const { Router } = require("express");
import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { cachedData } from "../DBMethods/Basics";
import { findBarbershop, findUser  } from "../DBMethods/Find";
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
    const barber = await findBarbershop(new ObjectId(id))
    console.log(barber)
    res.json(barber);
  }catch(e){
    console.log(e)
  }
  
});

router.get("/log-in", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUser(email, password);
  res.json(user.barbearia);
});

module.exports = router;
