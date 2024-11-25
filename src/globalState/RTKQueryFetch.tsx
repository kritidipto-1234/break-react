// @ts-nocheck


import { useState } from 'react';
import { useGetPostsQuery, useCreatePostMutation } from '../store/api';

export const RTKQueryFetch = () => {
    const [counter, setCounter] = useState(0);
    
    const {
        data: posts,
        isLoading,
        error
    } = useGetPostsQuery(undefined, {
        pollingInterval: 5000, // Similar to React Query's staleTime
        refetchOnFocus: true,
    });

    const [createPost, { isLoading: isCreating, error: mutationError }] = useCreatePostMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            await createPost({
                title: formData.get('title') as string,
                content: formData.get('content') as string
            }).unwrap();
            form.reset();
        } catch (error) {
            // Error handling is automatic with RTK Query
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div className="rtk-query">
            <h2>With RTK Query</h2>

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
                <button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Post'}
                </button>
            </form>

            <button onClick={() => setCounter(c => c + 1)}>
                Counter: {counter}
            </button>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.data.error}</div>}
            {mutationError?.data?.error}
            {mutationError && <div>Error: {JSON.stringify(mutationError)}</div>}
            {!error && posts && (
                <div>
                    <h3>Posts:</h3>
                    <ul>
                        {posts.map((post) => (
                            <li style={{color: post.temp ? 'red' : 'black'}} key={post.id}>
                                {post.title} {post.content}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <small>
                Note: Data auto-refreshes, caches, and handles stale states with RTK Query
            </small>
        </div>
    );
};

export default RTKQueryFetch;