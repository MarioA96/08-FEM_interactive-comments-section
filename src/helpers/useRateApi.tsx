import { RateApi } from "./connections/rateApi";

export const useRateApi = () => {

    const getRate = async() => {
        try {
            const score = await fetch('http://localhost:3000/score')
                            .then((resp) => resp.json())
                            .then((score) => {
                                return score;
                            });
            return score;
        } catch (error) {
            console.error('Error fetching score', error);
        }
    }

    const postRate = async(typeRate: string, idCommentParent: string, idCommentChild?: string) => {
        
        try {
            
            const ratedComment = idCommentChild 
                                    ? await RateApi.post(`/ratedComments/`, typeRate, idCommentParent, idCommentChild )
                                    : await RateApi.post(`/ratedComments/`, typeRate, idCommentParent);
            return ratedComment;

        } catch (error) {
            console.error('Error posting rating', error);
        }

    }

    return {
        getRate,
        
        postRate
    }
}
