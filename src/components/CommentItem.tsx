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
import { useCommentItem } from "@/helpers/hooks/useCommentItem";
import { AutorCommentSection } from "./AutorCommentSection";



export const CommentItem = ({ idCommentParent, idCommentChild, user, createdAt, content, score, replyingTo, isSelfComment, isReply }: { idCommentParent: string, idCommentChild?: string , user: User, createdAt: string, content: string, score: number, replyingTo?: string, isSelfComment: boolean, isReply?: boolean }) => {

    const {
        form, 
        isEditingComment, 
        isReplyingParent,
        isReplyingChild,

        setIsEditigComment, 
        setIsReplyingParent,
        setIsReplyingChild,

        onSubmit, 
        handleCancel
    } = idCommentChild 
                        ? useCommentItem(content, idCommentParent, idCommentChild) 
                        : useCommentItem(content, idCommentParent);
    
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
                                isEditingComment 
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
                                                    <Button onClick={handleCancel} className="bg-red-500">Cancel</Button>
                                                    <Button type="submit" className={ css({ backgroundColor: 'indigo.700' }) }>Update</Button>
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
                                !isEditingComment && (
                                    <>
                                        <div id="replyComment_score" className={ cx( gridItem({ colSpan: 4 }), css({ borderRadius: '10px' }) ) }>
                                            <CommentScore score={ score }/>
                                        </div>
                                        <div id="replyComment_btn_actions" className={ gridItem({ colSpan: 8 }) }>
                                            <CommentActions setIsReplyingParent={setIsReplyingParent} setIsReplyingChild={setIsReplyingChild} setIsEditigComment={setIsEditigComment} isSelfComment={isSelfComment} idCommentParent={idCommentParent} idCommentChild={idCommentChild}/>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </CardFooter>

                </Card>

                {
                    isReplyingParent && (
                        <>
                            <div id="lateralSeparator" className={ cx( gridItem({ colSpan: 1 }), css({ height: '100%', width: '2px', backgroundColor: 'gray.400' }) ) }></div>
                            <div className={ gridItem({ colSpan: 11 }) }>
                                <AutorCommentSection idCommentParent={idCommentParent} isReplyingParent={isReplyingParent} setIsReplyingParent={setIsReplyingParent} setIsReplyingChild={setIsReplyingChild} replyingToParentUser={user.username}/>
                            </div>
                        </>
                    )
                }
                {
                    isReplyingChild && (
                        <>
                            <div id="lateralSeparator" className={ cx( gridItem({ colSpan: 1 }), css({ height: '100%', width: '2px', backgroundColor: 'gray.400' }) ) }></div>
                            <div className={ gridItem({ colSpan: 11 }) }>
                                <AutorCommentSection idCommentParent={idCommentParent} idCommentChild={idCommentChild} isReplyingChild={isReplyingChild} setIsReplyingParent={setIsReplyingParent} setIsReplyingChild={setIsReplyingChild} replyingToChildUser={user.username}/>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
};
