import type { CommentElement } from "@/interfaces/comment.interface";

export class CommentApi {

    static baseUrl = 'http://localhost:3000';

    static async get(endpoint: string) {
        const resp = await fetch( CommentApi.baseUrl + endpoint );
                            
        return resp;
    }

    static async post(endpoint: string, comment: CommentElement) {
        const resp = await fetch( CommentApi.baseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        
        return resp;
    }
    

}