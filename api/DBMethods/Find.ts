import { connectToDatabase } from "./Basics";

export const findUser = async (email: string, password: string) => {
  const db = await connectToDatabase();

  const credenciais = db.collection("credenciais");

  const user = credenciais.find({
    email: email,
    password: password,
  });
  if(!user){
    throw new Error("User not found");
  }
  return user;
};
