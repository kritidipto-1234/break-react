import { useState,useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Post = {
    id: number;
    title: string;
    content: string;
    temp?: boolean;
}

//react - server heavy state
//redux client heavy state

// Modern Component (with React Query)
export const ReactQueryFetch = () => {
    const [counter, setCounter] = useState(0);

    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        },
        staleTime: 5000, // Consider data fresh for 5 seconds
        refetchOnWindowFocus: true, // Auto-refresh when tab is focused
    });

    const { data: mutationErrorData, isError } = useQuery({
        queryKey: ['postError'],
        enabled: false, // This query won't automatically run
    });

    const queryClient = useQueryClient();

    const { mutate, isPending , error: mutationError } = useMutation({
        onMutate: async (newPost) => {
            // debugger;
            // return ['from onMutate'];//context
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['posts'] });
            
            // Snapshot previous value
            const previousPosts: Post[] = queryClient.getQueryData(['posts']) || [];
            
            // Optimistically update cache
            queryClient.setQueryData(['posts'], (old: Post[]) => {
                return [...old, {title: newPost.get('title'), content: newPost.get('content'), temp: true, id: old.length + 1}];
            });
            
            return  previousPosts ;//context or rollback
        },
        mutationFn: async (variables: FormData) => {
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: variables.get('title'),
                    content: variables.get('content')
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return response.json();//data returned from fetch
            // return ['from mutationFn'];
        },
        onSuccess: (dataFromMutationFn, variables, contextFromMutate) => {
            // debugger;
            const newPost = dataFromMutationFn;
            const previousPosts = contextFromMutate;
            // Option 1: Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['posts'] });

            // Option 2: Manually update cache with returned data
            queryClient.setQueryData(['posts'], (old: Post[]) => [...previousPosts, newPost]);
            queryClient.setQueryData(['postError'], null);
        },
        onError: (error, variables, contextFromMutate) => {
            // Set global error state
            queryClient.setQueryData(['postError'], error.message);
            // Rollback posts
            queryClient.setQueryData(['posts'], contextFromMutate);        
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        mutate(new FormData(form), {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <div className="react-query">
            <h2>With React Query</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    required
                />
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create Post'}
                </button>
            </form>

            <button onClick={() => setCounter(c => c + 1)}>
                Counter: {counter}
            </button>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {(error as Error).message}</div>}
            {/* {mutationError && <div>Error: {(mutationError as Error).message}</div>} */}
            {mutationErrorData && <div>Error: {mutationErrorData.toString()}</div>}
            {!error && data && (
                <div>
                    <h3>Posts:</h3>
                    <ul>
                        {data.map((post: { id: number, title: string, content: string, temp?: boolean }) => (
                            <li style={{color: post.temp ? 'red' : 'black'}} key={post.id}>{post.title} {post.content}</li>
                        ))}
                    </ul>
                </div>
            )}
            <small>
                Note: Data auto-refreshes, caches, and handles stale states
            </small>
        </div>
    );
};
