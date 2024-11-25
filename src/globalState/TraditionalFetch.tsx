import { useState,useEffect } from 'react';

// Traditional Component (without React Query)
export const TraditionalFetch = () => {
    const [data, setData] = useState< { id: number, title: string, content: string, likes: number }[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [counter, setCounter] = useState(0);

    // Create post function using FormData
    const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        try {
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

            // Reset form and refetch posts
            form.reset();
            fetchPosts();
        } catch (err) {
            setError(err as Error);
        }
    };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/posts');
            const result = await response.json();
            if (response.status !== 200) setError(result);
            else setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="traditional">
            <h2>Without React Query</h2>
            
            <form onSubmit={createPost}>
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
                <button type="submit">
                    Create Post
                </button>
            </form>

            <button onClick={() => setCounter(c => c + 1)}>
                Counter: {counter}
            </button>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && (
                <div>
                    <h3>Posts:</h3>
                    <ul>
                        {data.map(post => (
                            <li key={post.id}>{post.title} {post.content}</li>
                        ))}
                    </ul>
                </div>
            )}
            <small>Note: Data won't auto-refresh or cache</small>
        </div>
    );
};
