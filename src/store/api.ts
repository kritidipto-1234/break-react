import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Post = {
    id: number;
    title: string;
    content: string;
    temp?: boolean;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => 'posts',
            providesTags: ['Posts']
        }),
        createPost: builder.mutation<Post, { title: string; content: string }>({
            query: (post) => ({
                url: 'posts',
                method: 'POST',
                body: post,
            }),
            async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
                // Optimistic update
                const patchResult = dispatch(
                    api.util.updateQueryData('getPosts', undefined, (draft) => {
                        draft.push({
                            ...newPost,
                            id: draft.length + 1,
                            temp: true
                        });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    // Undo optimistic update on error
                    patchResult.undo();
                }
            },
            invalidatesTags: ['Posts']
        })
    })
});

export const { useGetPostsQuery, useCreatePostMutation } = api; 