import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRouter);

const port = 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
