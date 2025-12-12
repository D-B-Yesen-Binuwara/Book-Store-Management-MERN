import dotenv from "dotenv";


dotenv.config();


export const port = process.env.PORT || 5000;
export const mongoDBURL = process.env.MONGO_DB_URL;

