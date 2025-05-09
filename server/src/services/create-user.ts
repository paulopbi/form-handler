import { Request, Response } from "express";
import { DatabaseSchema } from "../schema";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { prisma } from "../lib/prisma";

export const createUser = async (req: Request, res: Response) => {
  const result = DatabaseSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Dados inválidos", errors: result.error.flatten() });
  }

  try {
    const user = await prisma.user.create({
      data: result.data,
    });
    return res
      .status(201)
      .json({ message: "usuário criado com sucesso", user });
  } catch (error) {
    //prisma error handler
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = error.meta?.target as string[];
        return res.status(400).json({
          message: `Já existe um usuário com este ${field.join(", ")}.`,
          field,
        });
      }
    }
    return res.status(500).json({
      message: "Erro interno no servidor",
    });
  }
};
