import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { css } from "styled-system/css"

export const CommentDeleteDialog = ({ onDelete }: { onDelete: Function }) => {
    return (
        <div id="dialog_container">
            <DialogContent className="min-w-[150px] max-w-[350px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>
                        <span className={css({ display: 'flex', alignItems: 'flex-start' })}>
                            Delete comment
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        <span className={css({ display: 'flex', textAlign: 'justify', color: 'gray.400', fontWeight: '500' })}>
                            Are you sure you want to delete this comment? This will remove the comment
                            and can't be undone.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className={css({ display: 'flex', justifyContent: 'center', spaceX: '10' })}>
                        <DialogClose asChild>
                            <Button className={ css({ backgroundColor: 'gray.500' }) }>
                                NO, CANCEL
                            </Button>
                        </DialogClose>
                        <Button onClick={() => onDelete()} className={ css({ backgroundColor: 'red.500' }) }>
                            YES, DELETE
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </div>
        
    )
}
