'use client';

import { css, cx } from "styled-system/css";
import { grid, gridItem } from "styled-system/patterns";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {v4 as uuidv4} from 'uuid';

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

import type{ CommentElement, User } from "@/interfaces/comment.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCommentApi } from "@/helpers/useCommentApi";
import { useEffect, useState } from "react";


const formSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }).max(270,{
        message: "Comment must be at most 270 characters."
    }),
})


export function AutorCommentSection({idCommentParent, idCommentChild, isReplyingParent, setIsReplyingParent, isReplyingChild, setIsReplyingChild, replyingToParentUser, replyingToChildUser}:{idCommentParent?: string, idCommentChild?: string, isReplyingParent?: boolean, setIsReplyingParent?: Function, isReplyingChild?: boolean, setIsReplyingChild?: Function, replyingToParentUser?: string, replyingToChildUser?: string}) {

    //QueryClient for cache management
    const queryClient = useQueryClient();

    const [currentUser, setCurrentUser] = useState<User>({
        image: {
            png: '',
            webp: ''
        },
        username: ''
    });

    //Local query of the cache
    const queryCurrentUser = useQuery<User, unknown>(
        ['currentUser'],
    );

    useEffect(() => {
        setCurrentUser(queryCurrentUser.data!);
    }, [currentUser]);


    //Mutation of the cache by adding a new comment
    const commentApi = useCommentApi();
    const mutation = useMutation({
        mutationFn: commentApi.postComment,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })
    
    //TODO agregar la petición de la api para agregar un comentario reply quitando el @ del comentario
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: isReplyingParent || isReplyingChild ? `@${isReplyingParent ? replyingToParentUser : replyingToChildUser} ` : '',
        },
    });

    type CommentParameter = {
        comment: CommentElement,
        idCommentParent?: string,
        idCommentChild?: string,
    }
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        
        const comment: CommentElement = {
            id: uuidv4(),
            content: values.comment,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: isReplyingParent ? replyingToParentUser : isReplyingChild ? replyingToChildUser : '',
            user: queryCurrentUser.data!,
            replies: []
        }
        let parameters: CommentParameter = { comment };
        if(idCommentChild){
            parameters = { comment, idCommentParent, idCommentChild };
        }
        else if(idCommentParent){
            parameters = { comment, idCommentParent };
        }

        mutation.mutate({...parameters});
    }

    function handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault(); 
        if(isReplyingParent && setIsReplyingParent){
            setIsReplyingParent(false);
        }
        else if(isReplyingChild && setIsReplyingChild){
            setIsReplyingChild(false);
        }
    }
  
    return (
        <div className={ cx( gridItem({ colSpan: 11 }), css({ height: '208px', marginTop: 'auto' }) ) }>
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
                                            {
                                                (isReplyingParent || isReplyingChild)
                                                    ? (
                                                        <Textarea 
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    )
                                                    : (
                                                        <Textarea 
                                                            placeholder="Add a comment..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    )
                                            }
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <div className={grid({ columns: 12 })}>
                                <div className={gridItem({ colSpan: 4 })}>
                                    {
                                        queryCurrentUser &&  (
                                            <img src={ queryCurrentUser.data?.image.png } width="38px"/>
                                        )
                                    }
                                </div>
                                {
                                    (isReplyingParent || isReplyingChild)  
                                        && (
                                            <Button 
                                                onClick={handleCancel}
                                                className={cx( gridItem({ colSpan: 4 }), 
                                                    css({ 
                                                        backgroundColor: 'red.500', 
                                                        _hover: { backgroundColor: 'hsl(211, 10%, 45%)' }
                                                    }) )}
                                            >
                                                Cancel
                                            </Button>
                                        )
                                }
                                <Button type="submit" className={cx( gridItem({ colSpan: 4 }), 
                                    css({ 
                                        backgroundColor: 'hsl(238, 40%, 52%)', 
                                        _hover: { backgroundColor: 'hsl(211, 10%, 45%)' }
                                    }) )}
                                >
                                    {
                                        isReplyingParent || isReplyingChild
                                            ? 'Reply'
                                            : 'Send'
                                    }
                                </Button>
                            </div>
                            
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      )
};
