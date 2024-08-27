import type { RatedComment } from "@/interfaces/comment.interface";

export class RateApi {

    static baseUrl = 'https://zero8-fem-server.onrender.com';

    static async post(endpoint: string, typeRate: string, idCommentParent: string, idCommentChild?: string): Promise<Response | void> {
        
        try {

            const newRatedComment: RatedComment = {
                id: idCommentParent,
                rating: typeRate,
                ratingChilds: idCommentChild ? [{ idChild: idCommentChild, rating: typeRate }] : []
            }

            const response = await fetch(RateApi.baseUrl + endpoint)
                .then(response => response.json())
                .then(ratedComments => {

                    let parentReply: RatedComment = ratedComments.find((ratedComment: { id: string }) => ratedComment.id === idCommentParent);

                    if (parentReply) {
                        // Paso 1: Crear el elemento anidado
                        if(idCommentChild){
                            let child = (parentReply.ratingChilds || []).find((child: { idChild: string }) => child.idChild === idCommentChild);
                            if(!child){
                                (parentReply.ratingChilds || []).push({ idChild: idCommentChild, rating: typeRate });
                            }
                            else{
                                child.rating = typeRate;
                            }
                        }
                        else{
                            parentReply = {...newRatedComment };
                        }

                        // Paso 2: Actualizar el recurso padre
                        return fetch(`${RateApi.baseUrl}${endpoint}${idCommentParent}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(parentReply) // Actualizar el recurso padre con el nuevo comentario anidado
                        });
                    }
                    else{ //Nada en la base de datos o no existe el recurso con tal idParent
                        return fetch(RateApi.baseUrl + endpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newRatedComment)
                        });
                    }
                })

        } catch (error) {
            console.error('Error posting rating', error);
        }

    }

    //** Caso inicial 'neutral' cuando hace primer rate o hace el cambio de un rate a neutral LISTO */
    /////TODO Caso 1: Cuando el usuario hace un rate por primera vez o cambia de rate a neutral LISTO

    //TODO Caso 2.1: Cuando el usuario cambia de rate a otro rate en el mismo recurso padre PENDIENTE

    //TODO Caso 3.1: Cuando el usuario cambia de rate a otro rate en un recurso hijo PENDIENTE

    //TODO Caso 4.1: Cuando el usuario cambia de rate a otro rate en un recurso padre y otro recurso hijo PENDIENTE

    //TODO Caso 5.1: Cuando se elimina un comentario padre o hijo este debe eliminar igualmente su rate PENDIENTE
            

}