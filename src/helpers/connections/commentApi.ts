import type { CommentElement } from "@/interfaces/comment.interface";

export class CommentApi {

    static baseUrl = 'https://zero8-fem-server.onrender.com';

    static async get(endpoint: string) {
        try {
            const resp = await fetch( CommentApi.baseUrl + endpoint );       
            return resp;

        } catch (error) {
            console.error('Error in get method:', error);
            throw error;
        }
        
    }

    static async post(endpoint: string, comment: CommentElement, idCommentParent?: string, idCommentChild?: string): Promise<Response | void> {
        try {
            
            const response = await fetch(CommentApi.baseUrl + endpoint)
                .then(response => response.json())
                .then(data => {
                    
                    const parentReply = data.find((commentElement: { id: string }) => commentElement.id === idCommentParent);

                    if (parentReply) {
                        // Paso 1: Crear el elemento anidado
                        parentReply.replies = parentReply.replies || [];
                        parentReply.replies.push({
                            ...comment,
                            content: comment.content.replace(/@[\w]+/g, ''),
                        });

                        // Paso 2: Actualizar el recurso padre
                        return fetch(`${CommentApi.baseUrl}${endpoint}/${idCommentParent}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(parentReply) // Actualizar el recurso padre con el nuevo comentario anidado
                        });
                    }
                    else{
                        return fetch(CommentApi.baseUrl + endpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(comment)
                        });
                    }
                })
                .then(response => response?.json())
                .then(updatedData => console.log('Updated object:', updatedData))
                .catch(error => console.error('Error:', error));

            return response;

        } catch (error) {
            console.error('Error in post method:', error);
            throw error;
        }
    }

    static async delete(endpoint: string, idCommentChild?: string) {
        try {
            if (idCommentChild) {
                const response = await fetch(CommentApi.baseUrl + endpoint);
                const data = await response.json();
    
                // Paso 2: Eliminar el elemento anidado
                const updatedReplies = data.replies.filter((reply: { id: string }) => reply.id !== idCommentChild);
    
                // Paso 3: Actualizar el recurso padre
                const deleteResponse = await fetch(CommentApi.baseUrl + endpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ replies: updatedReplies })
                });
    
                return deleteResponse;
            } else {
                const response = await fetch(CommentApi.baseUrl + endpoint);
                const data = await response.json();

                const deleteResponse = await fetch(CommentApi.baseUrl + endpoint, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                });
    
                return deleteResponse;
            }
        } catch (error) {
            console.error('Error in delete method:', error);
            throw error;
        }
    }

    static async put(endpoint: string, content: (string | number), idCommentChild?: string) {
        try {
            if(typeof content === 'string'){
                if (idCommentChild) {
                    const response = await fetch(CommentApi.baseUrl + endpoint);
                    const data = await response.json();
        
                    // Paso 2: Modificar el elemento anidado
                    const updatedReplies = data.replies.map((reply: { id: string }) => {
                        if (reply.id === idCommentChild) {
                            return { ...reply, content };
                        }
                        return reply;
                    });
        
                    // Paso 3: Actualizar el recurso padre
                    const putResponse = await fetch(CommentApi.baseUrl + endpoint, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data, replies: updatedReplies })
                    });
        
                    return putResponse;
                } else {
                    const response = await fetch(CommentApi.baseUrl + endpoint);
                    const data = await response.json();
    
                    const putResponse = await fetch(CommentApi.baseUrl + endpoint, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data, content })
                    });
        
                    return putResponse;
                }
            }
            else if(typeof content === 'number'){
                if (idCommentChild) {
                    const response = await fetch(CommentApi.baseUrl + endpoint);
                    const data = await response.json();
        
                    // Paso 2: Modificar el elemento anidado
                    const updatedReplies = data.replies.map((reply: { id: string }) => {
                        if (reply.id === idCommentChild) {
                            return { ...reply, score: content };
                        }
                        return reply;
                    });
        
                    // Paso 3: Actualizar el recurso padre
                    const putResponse = await fetch(CommentApi.baseUrl + endpoint, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data, replies: updatedReplies })
                    });
        
                    return putResponse;
                } else {
                    const response = await fetch(CommentApi.baseUrl + endpoint);
                    const data = await response.json();
    
                    const putResponse = await fetch(CommentApi.baseUrl + endpoint, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data, score: content })
                    });
        
                    return putResponse;
                }
            }
        } catch (error) {
            console.error('Error in put method:', error);
            throw error;
        }
    }
    

}