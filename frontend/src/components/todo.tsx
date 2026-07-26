/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useTodo } from '@/hooks/use-todo';
import { toast } from 'sonner';

interface Props {
    className?: string;
}

export const Todo: React.FC<Props> = (props) => {
    const { className } = props;
    const { createTodo, data, deleteTodo } = useTodo()
    const [text, setText] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const addTodo = async () => {
        setLoading(true)
        try {
            await createTodo(text)
            toast.success("Your todo created successfuly")
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to create todo: " + `(${error?.response.data.message})`)
        } finally {
            setLoading(false)
        }
    }
    const removeTodo = async (id: number) => {
        setLoading(true)
        try {
            await deleteTodo(id)
            toast.success("Your todo delted successfuly")
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to delete todo: " + `(${error?.response.data.message})`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={cn("flex gap-2 flex-col justify-center items-center min-h-screen", className)}>
            <form className='flex w-full items-center justify-between max-w-100 gap-5' onSubmit={async (e) => {
                e.preventDefault()
                await addTodo()
            }}>
                <Input onChange={(e) => setText(e.target.value)} value={text} className='max-w-70 border-2 border-black' />
                <Button type='submit' disabled={loading}>Add <Plus /></Button>
            </form>
            <ul className='max-w-100 w-full'>
                {
                    data?.map((el: any) => (
                        <li className='flex gap-5 w-full justify-between hover:bg-accent' key={el.id}>
                            {el.text}
                            <div className='flex'>
                                <Button disabled={loading} onClick={() => removeTodo(el.id)} variant={'destructive'}>Delete</Button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}