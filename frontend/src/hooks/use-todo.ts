/* eslint-disable @typescript-eslint/no-explicit-any */
"use state"
import { ApiRouts } from "@/lib/const"
import { fetcher } from "@/lib/fetcher"
import { axiosInstance } from "@/lib/instance"
import useSWR from "swr"

export const useTodo = () => {
    const { data, error, isLoading, mutate } = useSWR(ApiRouts.TODO, fetcher)

    const createTodo = async (text: string) => {
        const newTodo = (await axiosInstance.post(ApiRouts.TODO, { text })).data
        mutate([newTodo, ...data])
    }

    const deleteTodo = async (id: number) => {
        await axiosInstance.delete(ApiRouts.TODO + `/${id}`)
        mutate(data.filter((todo: any) => todo.id !== id))
    }

    const updateTodo = async (completed: boolean, id: number) => {
        await axiosInstance.patch(ApiRouts.TODO + `/${id}`, { completed })
        mutate(data.map((el: any) => {
            if (id === el.id) {
                el.completed = completed
            }
            return el
        }))
    }

    return { createTodo, updateTodo, deleteTodo, data, error, isLoading }
}
