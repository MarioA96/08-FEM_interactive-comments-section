
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { css, cva } from "styled-system/css";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentApi } from "@/helpers/useCommentApi";

import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";


const toggleGroup = cva({
    base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'fit-content',
        height: '30px',
        backgroundColor: 'gray.100',
        borderRadius: '10px',
        '& span#score_value': {
            height: '20px', 
            width: '15px', 
            marginLeft: '7px', 
            marginTop: '6px',
            fontWeight: 'bold', 
            fontSize: '12px',
            color: 'hsl(212, 24%, 26%)'
        },
        '& #toggleGroupItem': {
            cursor: 'pointer',
            '& #span_icon_plus': {
                fontSize: '16.5px', 
                fontWeight: 'bolder', 
                color: 'blue.500'
            },
            '& #span_icon_minus': {
                fontSize: '16.5px', 
                fontWeight: 'bolder', 
                color: 'red.500'
            }
        }
    }
});


const formSchema = z.object({
    value: z.number().int().min(0).max(100),
})


export function CommentScore({ score, idCommentParent, idCommentChild }: { score: number, idCommentParent: string, idCommentChild?: string }) {

    const queryClient = useQueryClient();
    const commentApi = useCommentApi();

    const [valueScore, setValueScore] = useState<number>(score);
    const [actualTypeScore, setActualTypeScore] = useState<string>('neutral');
    //TODO - agregar un valor que indique que deshabilite el boton de votar si ya votó
    //TODO - agregar un brillo al boton que votó
    //TODO - agregar un valor que indique que hasBeenRated para que no pueda votar mas de una vez y sepa a quien votó
    //TODO - agregar en la BD un campo que indique a quien votó y que valor le dió basado en los ID's de los comentarios (array de ids y valores)
    //TODO - Se podria guardar el rate en un store una vez capturado por tanStack
    /* 
        "ratings": {
            "ratedCommentsIds": [
                {
                    "idComment": string,
                    "typeRate": string
                }
            ]
        }
    */

    const mutation = useMutation({
        mutationFn: commentApi.updateComment,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    const onScoreChange = (value: number, typeScore: string) => {
        console.log(value, typeScore);
        
        if(typeScore === 'plus') {
            if(actualTypeScore === 'minus') {
                setValueScore(value + 2);
                setActualTypeScore('plus');
            } else {
                setValueScore(value + 1);
                setActualTypeScore('plus');
            }
        } else {
            if(actualTypeScore === 'plus') {
                setValueScore(value - 2);
                setActualTypeScore('minus');
            } else {
                setValueScore(value - 1);
                setActualTypeScore('minus');
            }
        }
    }

    return (
        <ToggleGroup type="single" className={ toggleGroup({}) }>
            <ToggleGroupItem id="toggleGroupItem" value="plus" aria-label="Toggle plus" onClick={() => onScoreChange(valueScore, 'plus')}>
                <span id="span_icon_plus">+</span>
            </ToggleGroupItem>

            <span id="score_value">
                { valueScore }
            </span>

            <ToggleGroupItem id="toggleGroupItem" value="minus" aria-label="Toggle minus" onClick={() => onScoreChange(valueScore, 'minus')}>
                <span id="span_icon_minus">-</span>
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
