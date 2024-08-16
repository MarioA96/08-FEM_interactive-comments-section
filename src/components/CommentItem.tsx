import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentApi } from "@/helpers/useCommentApi";

import { css, cx } from "styled-system/css";
import { grid, gridItem } from "styled-system/patterns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button";

import { CommentScore } from "./CommentScore";
import { CommentActions } from "./CommentActions";
import type { User } from "@/interfaces/comment.interface";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";



const formSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }).max(270,{
        message: "Comment must be at most 270 characters."
    }),
})

export const CommentItem = ({ idCommentParent, idCommentChild, user, createdAt, content, score, replyingTo, isSelfComment, isReply }: { idCommentParent: string, idCommentChild?: string , user: User, createdAt: string, content: string, score: number, replyingTo?: string, isSelfComment: boolean, isReply?: boolean }) => {
  
    const [isEditigComment, setIsEditigComment] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const commentApi = useCommentApi();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: content,
        },
    });

    const mutation = useMutation({
        mutationFn: commentApi.updateComment,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    type Parameter = {
        idCommentParent: string,
        content: string
        idCommentChild?: string,
    };
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({idCommentParent, idCommentChild, values});
        
        const content = values.comment;
        const parameters: Parameter = idCommentChild 
                            ? { idCommentParent, content, idCommentChild } 
                            : { idCommentParent, content };
        
        mutation.mutate({...parameters});
        setIsEditigComment(false);
    }
    function handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault(); 
        setIsEditigComment(false);
    }


    return (
        <>
            <div className={ cx( grid({ columns: 12 }), gridItem({ colSpan: 11 }), css({ height: 'fit-content', marginLeft: isReply ? '5px' : '0px' }) ) }>
                {
                    isReply && (
                        <div id="lateralSeparator" className={ cx( gridItem({ colSpan: 1 }), css({ height: '100%', width: '2px', backgroundColor: 'gray.400' }) ) }></div>
                    )
                }
                
                <Card className={ cx( gridItem({ colSpan: isReply ? 11 : 12 }), css({ height: 'fit-content' }) ) }>

                    <CardHeader>
                        <div className={ grid({ columns: 12 }) }>
                            <div className={ gridItem({ colSpan: 2 }) }>
                                <img id="replyComment_image" src={ user.image.webp } alt="avatar" width="32px" />
                            </div>
                            <div className={ gridItem({ colSpan: 6 }) }>
                                <span id="replyComment_username" className="font-sans font-extrabold text-slate-600 text-[12px]">{ user.username }</span>
                                {
                                    isSelfComment && ( 
                                        <Badge className="ml-2 h-4 w-10 rounded-none bg-indigo-700">you</Badge>
                                    )
                                }
                            </div>
                            <div className={ gridItem({ colSpan: 4 }) }>
                                <span id="replyComment_createdAt" className="font-sans font-semibold text-slate-400 text-[13px]">{ createdAt }</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div id="replyComment_content" className="font-sans font-medium text-gray-400 text-[13px]">
                            { replyingTo && ( <span className="text-indigo-600 font-bold">@{ replyingTo }&nbsp;</span> ) } 
                            { 
                                isEditigComment 
                                    ? (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                
                                                <FormField
                                                    control={form.control}
                                                    name="comment"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Textarea 
                                                                    className="resize-none"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                 <div id="replyComment_btn_update" className={ cx( gridItem({ colSpan: 8 }), css({ spaceX: 4, marginTop: 3, marginLeft: 5 }) ) }>
                                                    <Button type="submit" className={ css({ backgroundColor: 'indigo.700' }) }>Update</Button>
                                                    <Button onClick={handleCancel}>Cancel</Button>
                                                </div>

                                            </form>
                                        </Form>
                                      ) 
                                    : content 
                            }
                        </div>
                    </CardContent>

                    <CardFooter>
                        <div className={ grid({ columns: 12, gap: '6' }) }>
                            {
                                !isEditigComment && (
                                    <>
                                        <div id="replyComment_score" className={ cx( gridItem({ colSpan: 4 }), css({ borderRadius: '10px' }) ) }>
                                            <CommentScore score={ score }/>
                                        </div>
                                        <div id="replyComment_btn_actions" className={ gridItem({ colSpan: 8 }) }>
                                            <CommentActions setIsEditigComment={setIsEditigComment} isSelfComment={isSelfComment} idCommentParent={idCommentParent} idCommentChild={idCommentChild}/>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </CardFooter>

                </Card>
            </div>
        </>
    )
};
