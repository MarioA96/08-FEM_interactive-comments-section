import type { CommentElement, User } from "@/interfaces/comment.interface";
import { CommentApi } from "./connections/commentApi";

export const useCommentApi = () => {

    const getComments = async() => {

        try {
            const comments:CommentElement[] = await CommentApi.get('/comments')
                                            .then((resp) => resp.json())
                                            .then((comments) => {
                                                return comments;
                                            });
            return comments;
        } catch (error) {
            console.error('Error fetching comments', error);
        }

    }

    const getCurrentUser = async() => {

        try {
            const currentUser: User = await CommentApi.get('/currentUser')
                                            .then((resp) => resp.json())
                                            .then((user) => {
                                                return user;
                                            });
            return currentUser;
        } catch (error) {
            console.error('Error fetching comments', error);
        }

    }

    const postComment = async(comment: CommentElement) => {

        try {
            const newComment:CommentElement = await CommentApi.post('/comments', comment)
                                            .then((resp) => resp.json())
                                            .then((comment) => {
                                                return comment;
                                            });
            return newComment;
        } catch (error) {
            console.error('Error posting comment', error);
        }

    }

    const deleteComment = async(idCommentParent: string, idCommentChild?: string) => {
            
        try {
            
            const deletedResp = idCommentChild ? await CommentApi.delete(`/comments/${idCommentParent}`, idCommentChild)
                                               : await CommentApi.delete(`/comments/${idCommentParent}`);
            
            return deletedResp;
        } catch (error) {
            console.error('Error deleting comment', error);
        }
    
    }


    return {
        getComments,
        getCurrentUser,

        postComment,

        deleteComment
    }
}
