import { css, cx } from "styled-system/css";
import { grid, gridItem } from "styled-system/patterns";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea"

import { CommentScore } from "./CommentScore";
import { CommentActions } from "./CommentActions";
import type { User } from "@/interfaces/comment.interface";
import { useState } from "react";
import { Button } from "./ui/button";

export const CommentItem = ({ idCommentParent, idCommentChild, user, createdAt, content, score, replyingTo, isSelfComment, isReply }: { idCommentParent: string, idCommentChild?: string , user: User, createdAt: string, content: string, score: number, replyingTo?: string, isSelfComment: boolean, isReply?: boolean }) => {
  
    const [isEditigComment, setIsEditigComment] = useState<boolean>(false);

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
                        <p id="replyComment_content" className="font-sans font-medium text-gray-400 text-[13px]">
                            { replyingTo && ( <span className="text-indigo-600 font-bold">@{ replyingTo }</span> ) } 
                            { 
                                isEditigComment 
                                    ? (
                                        //TODO Envolver esto en un Form y procesar la actualización del comentario con zod y el hook useMutation
                                        <Textarea 
                                            className="resize-none"
                                            value={content}
                                        />
                                      ) 
                                    : content 
                            }
                        </p>
                    </CardContent>

                    <CardFooter>
                        <div className={ grid({ columns: 12, gap: '6' }) }>
                            {
                                isEditigComment 
                                    ? (
                                        <div id="replyComment_btn_update" className={ gridItem({ colSpan: 8 }) }>
                                            <Button>Update</Button>
                                            <Button>Cancel</Button>
                                        </div>
                                    )
                                    : (
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
