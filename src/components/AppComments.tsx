import {
    QueryClient,
    QueryClientProvider
  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CommentSection } from './CommentSection';
import { AutorCommentSection } from './AutorCommentSection';


const queryClient = new QueryClient();

export const AppComments = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <CommentSection />
            <AutorCommentSection />
            
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
