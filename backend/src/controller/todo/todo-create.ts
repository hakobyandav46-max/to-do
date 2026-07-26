import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
export const todoCreate = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text.trim().length) {
            return res.status(404).json({ message: "please type your todo" })
        }
        const isTodo = await prisma.todo.findUnique({
            where: { text }
        })
        if (isTodo) {
            return res.status(404).json({ message: "this todo already exists" })
        }
        const newTodo = await prisma.todo.create({
            data: {
                text
            }
        })
        return res.status(201).json(newTodo)
    } catch (error) {
        console.log(error, "Server Error");
        res.status(500).json("Internal Server Error")
    }
}