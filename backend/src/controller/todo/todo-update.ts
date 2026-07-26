import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
export const todoUpdate = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const completed = req.body.completed;
        if (completed ?? false) {
            return res.status(404).json({ message: "Check your todo" })
        }
        if (!id) {
            return res.status(404).json({ message: "No todo was found with this id" })
        }
        const isTodo = await prisma.todo.findUnique({ where: { id } })
        if (!isTodo) {
            return res.status(404).json({ message: "todo not found" })
        }
        const updateTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                completed
            }
        })
        return res.status(201).json(updateTodo)
    } catch (error) {
        console.log(error, "Server Error");
        res.status(500).json("Internal Server Error")
    }
}