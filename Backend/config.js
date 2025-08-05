import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const mongoDBURL = process.env.MONGO_DB_URL;

