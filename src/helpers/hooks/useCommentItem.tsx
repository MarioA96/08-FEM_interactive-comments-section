import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentApi } from "@/helpers/useCommentApi";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";



const formSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }).max(270,{
        message: "Comment must be at most 270 characters."
    }),
})

export const useCommentItem = (content: string, idCommentParent: string, idCommentChild?: string) => {
    
    const [isEditingComment, setIsEditigComment] = useState<boolean>(false);
    const [isReplyingParent, setIsReplyingParent] = useState<boolean>(false);
    const [isReplyingChild, setIsReplyingChild] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const commentApi = useCommentApi();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: content,
        },
    });

    const mutation = useMutation({
        mutationFn: commentApi.updateComment,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    type Parameter = {
        idCommentParent: string,
        content: string
        idCommentChild?: string,
    };
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({idCommentParent, idCommentChild, values});
        
        const content = values.comment;
        const parameters: Parameter = idCommentChild 
                            ? { idCommentParent, content, idCommentChild } 
                            : { idCommentParent, content };
        
        mutation.mutate({...parameters});
        setIsEditigComment(false);
    }
    function handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault(); 
        setIsEditigComment(false);
    }
    
    return {
        form,
        isEditingComment,
        isReplyingParent,
        isReplyingChild,

        setIsEditigComment,
        setIsReplyingParent,
        setIsReplyingChild,
        onSubmit,
        handleCancel
    }
}
