import { useState, useEffect } from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector, fetchPosts, addOptimisticPost, createPost } from '../store/reduxStore';

// Component
export const ReduxFetch = () => {
    const [counter, setCounter] = useState(0);
    const dispatch = useAppDispatch();
    const { data, loading, error, creating, mutationError } = useAppSelector(state => state.posts);

    // Fetch posts on mount
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Optimistic update
        dispatch(addOptimisticPost({
            title: formData.get('title'),
            content: formData.get('content')
        }));

        // Actual creation
        dispatch(createPost(formData))
            // .unwrap()
            .then(() => {
                form.reset();
            })
            .catch(() => {
                // Error handling is done in the reducer
            });
    };

    return (
        <div className="redux-fetch">
            <h2>With Redux</h2>

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
                <button type="submit" disabled={creating}>
                    {creating ? 'Creating...' : 'Create Post'}
                </button>
            </form>

            <button onClick={() => setCounter(c => c + 1)}>
                Counter: {counter}
            </button>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {mutationError && <div>Error: {mutationError}</div>}
            {!error && data && (
                <div>
                    <h3>Posts:</h3>
                    <ul>
                        {data.map((post) => (
                            <li style={{color: post.temp ? 'red' : 'black'}} key={post.id}>
                                {post.title} {post.content}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <small>
                Note: Data managed by Redux, with optimistic updates
            </small>
        </div>
    );
};
