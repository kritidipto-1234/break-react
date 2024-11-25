import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from './Common';

// Async Thunks
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetch('http://localhost:3001/api/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (formData: FormData) => {
        const response = await fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: formData.get('title'),
                content: formData.get('content')
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return response.json();
    }
);

// Slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [] as Post[],
        loading: false,
        error: null as string | null,
        mutationError: null as string | null,
        creating: false,
    },
    reducers: {
        addOptimisticPost: (state, action) => {
            state.data.push({
                ...action.payload,
                temp: true,
                id: state.data.length + 1
            });
        },
        removeOptimisticPost: (state) => {
            state.data = state.data.filter(post => !post.temp);
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch posts cases
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            // Create post cases
            .addCase(createPost.pending, (state) => {
                state.creating = true;
                state.mutationError = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.creating = false;
                state.data = state.data.filter(post => !post.temp);
                state.data.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.creating = false;
                state.mutationError = action.error.message || 'Failed to create post';
                state.data = state.data.filter(post => !post.temp);
            });
    }
});

// Export actions
export const { addOptimisticPost, removeOptimisticPost } = postsSlice.actions;

// Export reducer
export const postsReducer = postsSlice.reducer;
