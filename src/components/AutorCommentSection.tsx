'use client';

import { css, cx } from "styled-system/css";
import { grid, gridItem } from "styled-system/patterns";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";

import type{ User } from "@/interfaces/comment.interface";


const formSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }).max(270,{
        message: "Comment must be at most 270 characters."
    }),
})


export function AutorCommentSection() {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const [items, setItems] = useState({} as User);

    useEffect(() => {
        const items: User = JSON.parse(localStorage.getItem('currentUser')!);
        if (items) {
            setItems(items);
        }
    }, []);

    //TODO manejarlo mediante tanstack con el manejo del cache, checando el devtoools
  
    return (
        <div className={ cx( gridItem({ colSpan: 11 }), css({ height: '208px' }) ) }>
            <Card className="h-52">
                <CardContent className={css({ marginTop: '15px' })}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Add a comment..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <div className={grid({ columns: 12 })}>
                                <div className={gridItem({ colSpan: 8 })}>
                                    <img src='' width="38px" />
                                </div>
                                <Button type="submit" className={cx( gridItem({ colSpan: 4 }), 
                                    css({ 
                                        backgroundColor: 'hsl(238, 40%, 52%)', 
                                        _hover: { backgroundColor: 'hsl(211, 10%, 45%)' }
                                    }) )}
                                >
                                    Send
                                </Button>
                            </div>
                            
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      )
};
