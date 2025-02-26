import { connectToDatabase } from "./Basics";
import { Request, Response } from "express";
import { cachedData } from "./Basics";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const findUser = async (email: string, password: string) => {
  const {db} = await connectToDatabase();
  const credenciais = db.collection("credenciais");

  const user = await credenciais.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: 401,
      message: "Invalid password",
    }
  }

  return {
    user: user,
    barbearia: await findBarbershop(user.barbearia_id)
  };
};


export const findBarbershop = async (id: ObjectId) => {
  const data = cachedData.filter((shop) => shop._id.toString() === id.toString());

  console.log(data);

  if (!data) {
    throw new Error("Barbershop not found");
  }
  return data;
};
