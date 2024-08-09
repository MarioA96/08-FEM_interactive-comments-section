import { Reply, Trash2, Edit3 } from 'lucide-react';
import { Dialog, DialogTrigger } from './ui/dialog';
import { css, cva, cx } from 'styled-system/css';
import { CommentDeleteDialog } from './CommentDeleteDialog';


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

export const CommentActions = ({ isSelfComment }: { isSelfComment: boolean}) => {
    return (
        <>
            {
                !isSelfComment ? (
                    <button className={ ElementBox({ visual: 'reply' }) }>
                        <Reply size={15} strokeWidth={3} />
                        <span>Reply</span>
                    </button>
                ) : (
                    <div className={ ElementBox({ }) }>
                        <div className={ ElementBox({ visual: 'trash' }) }>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className={ css({ cursor: 'pointer' }) }>
                                        <Trash2 size={15} strokeWidth={3} />
                                        <span>Delete</span>
                                    </button>
                                </DialogTrigger>
                                <CommentDeleteDialog />
                            </Dialog>
                        </div>
                        <div className={ ElementBox({ visual: 'edit' }) }>
                            <Edit3 size={15} strokeWidth={3} />
                            <span>Edit</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}
