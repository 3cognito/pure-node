import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async () => {
  try {
    await connect(process.env.DB_URI!);
    console.log("Database connection successful!");
  } catch (err) {
    console.log(err + "Database connection failed!!!");
    process.exit(0);
  }
};
