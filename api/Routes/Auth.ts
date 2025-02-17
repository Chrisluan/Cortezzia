const { Router } = require("express");
import { Request, Response } from "express";

const router = Router();

router.get('/login', (req: Request, res: Response)=>{
    res.send("Você está logado");
})

module.exports = router
