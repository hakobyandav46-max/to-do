import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const todoGet = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany()
        res.status(200).json(todos)
    } catch (error) {
        console.log(error, "Server Error");
        res.status(500).json("Internal Server Error")
    }
}