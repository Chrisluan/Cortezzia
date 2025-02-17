const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";
const router = Router();
