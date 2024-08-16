
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { css } from "styled-system/css";


export function CommentScore({ score }: { score: number }) {

  return (
    <ToggleGroup type="single" className={ 
        css({ 
            width: 'fit-content', 
            height: '30px', 
            backgroundColor: 'gray.100',
            borderRadius: '10px'
        }) 
    }>
        
        <ToggleGroupItem value="plus" aria-label="Toggle plus" className={ css({ cursor: 'pointer' }) }>
            <span className={ css({ fontSize: '16.5px', fontWeight: 'bolder', color: 'blue.500' }) }>+</span>
        </ToggleGroupItem>

        <span className={ 
            css({ 
                height: '20px', 
                width: '15px', 
                marginLeft: '7px', 
                marginTop: '6px',
                fontWeight: 'bold', 
                fontSize: '12px',
                color: 'hsl(212, 24%, 26%)' 
            }) 
        }>
            { score }
        </span>

        <ToggleGroupItem value="minus" aria-label="Toggle minus" className={ css({ cursor: 'pointer' }) }>
            <span className={ css({ fontSize: '19px', fontWeight: 'bolder', color: 'red.500' }) }>-</span>
        </ToggleGroupItem>

    </ToggleGroup>
  );
}
