import { connectToDatabase } from "./Basics";
import { Request, Response } from "express";
import { cachedData } from "./Basics";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const getBarbershopAdmin = async (email: string, password: string) => {
  const { db } = await connectToDatabase();
  const credenciais = db.collection("credenciais");
  const user = await credenciais.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: 401,
      message: "Invalid password",
    };
  }

  return {
    user: user,
    barbearia: await findBarbershop(user.barbearia_id),
  };
};

export const logInUser = async (email: string, password: string) => {
  const { db } = await connectToDatabase();
  const credenciais = await db.collection("user-credentials");
  const user = await credenciais.findOne({ email });

  if (!user) {
    return {};
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: 401,
      message: "Invalid password",
    };
  }

  return {
    userData: await findUserData(user._id.toString()),
  };
};

export const findUserData = async (id: string) => {
  const { db } = await connectToDatabase();

  const objID = new ObjectId(id);

  const data = await db.collection("user-data").findOne({ _id: objID });
  console.log(data);

  if (!data) {
    return { message: "Sem dados" };
  }
  return data;
};

export const findBarbershop = async (id: ObjectId) => {
  const data = cachedData.filter(
    (shop) => shop._id.toString() === id.toString()
  );

  console.log(data);

  if (!data) {
    throw new Error("Barbershop not found");
  }
  return data;
};
