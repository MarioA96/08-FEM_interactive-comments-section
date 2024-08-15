import type { CommentElement, User } from "@/interfaces/comment.interface";
import { CommentItem } from "./CommentItem";


export const CommentGroup = ({comment, currentUser}:{ comment: CommentElement, currentUser: User }) => {
    
    let isSelfComment = false;

    if( currentUser.username === comment.user.username ) {isSelfComment = true;}
    else {isSelfComment = false;}
    return (
        <>
            <CommentItem 
                idCommentParent={comment.id}
                user={comment.user} 
                createdAt={comment.createdAt} 
                content={comment.content} 
                score={comment.score}
                isSelfComment={isSelfComment} 
            />
            {
                comment.replies && comment.replies.map((reply, index) => {
                    if( currentUser.username === reply.user.username ) {isSelfComment = true;}
                    else {isSelfComment = false;}
                    return (
                        <CommentItem key={index} 
                            idCommentParent={comment.id}
                            idCommentChild={reply.id}
                            user={reply.user} 
                            createdAt={reply.createdAt} 
                            content={reply.content} 
                            score={reply.score}
                            replyingTo={reply.replyingTo} 
                            isSelfComment={isSelfComment}
                            isReply={true}
                        />
                    )
                })
            }
        </>
    )
}
