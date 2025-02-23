import { connectToDatabase } from "./Basics";
import { Request, Response } from "express";
import { cachedData } from "./Basics";
import { ObjectId } from "mongodb";
export const findUser = async (email: string, password: string) => {
  const db = await connectToDatabase();

  const credenciais = db.collection("credenciais");

  const user = credenciais.find({
    email: email,
    password: password,
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const findBarbershop = async (id: ObjectId) => {
  const data = cachedData.filter((shop) => shop._id.toString() === id.toString());

  console.log(data);

  if (!data) {
    throw new Error("Barbershop not found");
  }
  return data;
};
