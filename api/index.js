import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import crudRouter from "./routes/crudRouter.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//ROutes
app.use("/api/crudTodos", crudRouter);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT} port `);
    });
  } catch (error) {
    console.log("Error in starting server", error);
  }
};

startServer();
