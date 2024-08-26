
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { css, cva } from "styled-system/css";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentApi } from "@/helpers/useCommentApi";
import { useRateApi } from "@/helpers/useRateApi";

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


export function CommentScore({ score, idCommentParent, idCommentChild }: { score: number, idCommentParent: string, idCommentChild?: string }) {

    const queryClient = useQueryClient();
    const commentApi = useCommentApi();
    const rateApi = useRateApi();

    const [valueScore, setValueScore] = useState<number>(score);
    const [actualTypeRate, setActualTypeRate] = useState<string>('neutral');
    const [hasBeenRated, setHasBeenRated] = useState<boolean[]>([false, false]); //[plus, minus]
    /////TODO - agregar un valor que indique que deshabilite el boton de votar si ya votó
    /////TODO - agregar un brillo al boton que votó
    /////TODO - agregar un valor que indique que hasBeenRated para que no pueda votar mas de una vez y sepa a quien votó
    /////TODO - agregar en la BD un campo que indique a quien votó y que valor le dió basado en los ID's de los comentarios (array de ids y valores)
    /////TODO - se debe de actualizar el score del comentario en la BD -> /comments
    //TODO - se debe de actualizar a que comentario se le está votando (rate) en la BD -> /score (si typeScore es neutral, se quita)
    //TODO - Se podria guardar el rate en un store una vez capturado por tanStack

    const mutationScore = useMutation({
        mutationFn: () => (
            idCommentChild 
                ? commentApi.updateCommentScore(valueScore, idCommentParent, idCommentChild) 
                : commentApi.updateCommentScore(valueScore, idCommentParent)
        ),
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    const mutationRating = useMutation({
        mutationFn: () => (
            idCommentChild 
                ? rateApi.postRate(actualTypeRate, idCommentParent, idCommentChild) 
                : rateApi.postRate(actualTypeRate, idCommentParent)
        ),
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['ratings'] })
        },
    })

    const onScoreChange = (value: number, typeScore: string) => {
        if(typeScore === 'plus') {
            if(actualTypeRate === 'minus') {
                setValueScore(value + 2);
                setActualTypeRate('plus');
                setHasBeenRated([true, false]);
                mutationScore.mutate();
            }
            else if(actualTypeRate === 'plus'){ //Prev plus, to cancel score
                setValueScore(value - 1);
                setActualTypeRate('neutral');
                setHasBeenRated([false, false]);
                mutationScore.mutate();
            }
            else { //Neutral
                setValueScore(value + 1);
                setActualTypeRate('plus');
                setHasBeenRated([true, false]);
                mutationRating.mutate();
                mutationScore.mutate();
            }
        } else {
            if(actualTypeRate === 'plus') {
                setValueScore(value - 2);
                setActualTypeRate('minus');
                setHasBeenRated([false, true]);
                mutationScore.mutate();
            }
            else if(actualTypeRate === 'minus'){ //Prev minus, to cancel score
                setValueScore(value + 1);
                setActualTypeRate('neutral');
                setHasBeenRated([false, false]);
                mutationScore.mutate();
            } 
            else { //Neutral
                setValueScore(value - 1);
                setActualTypeRate('minus');
                setHasBeenRated([false, true]);
                mutationRating.mutate();
                mutationScore.mutate();
            }
        }
    }

    return (
        <ToggleGroup type="single" className={ toggleGroup({}) }>
            <ToggleGroupItem id="toggleGroupItem" value="plus" className={css({ boxShadow: hasBeenRated[0] ? '0px 0px 9px 2px rgba(4,31,224,0.79)' : ''  })} aria-label="Toggle plus" onClick={() => onScoreChange(valueScore, 'plus')}>
                <span id="span_icon_plus">+</span>
            </ToggleGroupItem>

            <span id="score_value">
                { valueScore }
            </span>

            <ToggleGroupItem id="toggleGroupItem" value="minus" className={css({ boxShadow: hasBeenRated[1] ? '0px 0px 9px 2px rgba(224,4,61,0.79)' : ''  })} aria-label="Toggle minus" onClick={() => onScoreChange(valueScore, 'minus')}>
                <span id="span_icon_minus">-</span>
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
