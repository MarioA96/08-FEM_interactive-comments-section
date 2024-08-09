import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

import { CommentSection } from './CommentSection';

const queryClient = new QueryClient();

export const AppComments = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CommentSection />
        </QueryClientProvider>
    )
}
