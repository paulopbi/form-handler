import express from "express";
import cors from "cors";
import { createUser } from "./services/create-user";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-user", createUser);

const port = 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
