import { Reply, Trash2, Edit3 } from 'lucide-react';
import { Dialog, DialogTrigger } from './ui/dialog';
import { css, cva } from 'styled-system/css';
import { CommentDeleteDialog } from './CommentDeleteDialog';
import { useCommentApi } from '@/helpers/useCommentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const ElementBox = cva({
    base: {
        display: 'flex', 
        alignItems: 'flex-start', 
        spaceX: '1', 
        width: 'fit-content',
        '& span': {
            fontWeight: 'bold', 
            fontSize: '12px'
        }
    },
    variants: {
        visual: {
            reply: { marginLeft: '50%', color: 'hsl(238, 40%, 52%)', cursor: 'pointer', },
            trash: { marginLeft: '40%', color: 'red.500', cursor: 'pointer', },
            edit: { color: 'hsl(238, 40%, 52%)', cursor: 'pointer', }
        }
    }
});

export const CommentActions = ({ setIsReplyingParent, setIsReplyingChild, setIsEditigComment, isSelfComment, idCommentParent, idCommentChild }: { setIsReplyingParent: Function, setIsReplyingChild: Function, setIsEditigComment: Function, isSelfComment: boolean, idCommentParent: string, idCommentChild?: string}) => {
    
    const queryClient = useQueryClient();
    const commnetApi = useCommentApi();

    const mutation = useMutation({
        mutationFn: () => (
            idCommentChild 
                ? commnetApi.deleteComment(idCommentParent, idCommentChild) 
                : commnetApi.deleteComment(idCommentParent)
        ),
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    const onDelete = () => {
        console.log(idCommentParent, idCommentChild);
        mutation.mutate();
    };
    
    const onEdit = () => {
        setIsEditigComment(true);
    }
    const onReplying = () => {
        if(idCommentChild){
            setIsReplyingChild(true);
            setIsReplyingParent(false);
        }
        else{
            setIsReplyingParent(true);
            setIsReplyingChild(false);
        }
    }

    return (
        <>
            {
                !isSelfComment 
                    ? (
                        <button onClick={ onReplying } className={ ElementBox({ visual: 'reply' }) }>
                            <Reply size={15} strokeWidth={3} />
                            <span>Reply</span>
                        </button>
                      ) 
                    : (
                        <div className={ ElementBox({ }) }>
                            <div className={ ElementBox({ visual: 'trash' }) }>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className={ css({ cursor: 'pointer' }) }>
                                            <Trash2 size={15} strokeWidth={3} />
                                            <span>Delete</span>
                                        </button>
                                    </DialogTrigger>
                                    <CommentDeleteDialog onDelete={ onDelete }/>
                                </Dialog>
                            </div>
                            <div onClick={onEdit} className={ ElementBox({ visual: 'edit' }) }>
                                <Edit3 size={15} strokeWidth={3} />
                                <span>Edit</span>
                            </div>
                        </div>
                      )
            }
        </>
    )
}
