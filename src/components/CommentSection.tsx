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

    //TODO - agregar un loading mientras se cargan los comentarios, con el isLoading de la query
    //TODO - agregar un mensaje de error si no se cargan los comentarios, con el isError de la query
    //TODO - agregar un manejador de estado para conservar la integridad de la query de los comentarios y ratedcomments

    //! De rateApi.ts
    //** Caso inicial 'neutral' cuando hace primer rate o hace el cambio de un rate a neutral LISTO */
    /////TODO Caso 1: Cuando el usuario hace un rate por primera vez o cambia de rate a neutral LISTO
    //TODO Caso 2.1: Cuando el usuario cambia de rate a otro rate en el mismo recurso padre PENDIENTE
    //TODO Caso 3.1: Cuando el usuario cambia de rate a otro rate en un recurso hijo PENDIENTE
    //TODO Caso 4.1: Cuando el usuario cambia de rate a otro rate en un recurso padre y otro recurso hijo PENDIENTE
    //TODO Caso 5.1: Cuando se elimina un comentario padre o hijo este debe eliminar igualmente su rate PENDIENTE
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
