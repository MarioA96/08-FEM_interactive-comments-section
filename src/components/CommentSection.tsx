import { useQuery } from "@tanstack/react-query";

import { useCommentApi } from "@/helpers/useCommentApi";

import { CommentGroup } from "./CommentGroup";
import type { CommentElement, User } from "@/interfaces/comment.interface";


export const CommentSection = () => {

    //Esto es una falla de diseno puesto a que desde el 
    // AutorCommentsection deberia de conseguir esta informacion pues es este 
    // el usuario de la aplicacion (o desde el nivel mas alto de la aplicacion)
    const commentApi = useCommentApi();
    const queryComments = useQuery(
        ['comments'],
        commentApi.getComments,
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );
    const queryCurrentUser = useQuery(
        ['currentUser'],
        commentApi.getCurrentUser,
        {
            staleTime: 1000 * 60 * 60 * 24,
        }
    );

    const setActualState = () => {
        queryComments.refetch();
        queryCurrentUser.refetch();
    }
    setActualState();
    const comments : CommentElement[] | undefined = queryComments.data;
    const currentUser : User | undefined = queryCurrentUser.data;

    return (
        
        <>
            {
                comments?.map((comment, index) => (
                    <CommentGroup key={index} comment={comment} currentUser={currentUser!} />
                ))
            }
        </>
    )
}
