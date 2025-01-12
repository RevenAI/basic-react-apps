import { useState } from 'react';

const Test = () => {
  const APP_API_URL = 'http://localhost:5000/Products';

  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async (postContent) => {
    setIsLoading(true);
    const id = posts.length
      ? (parseInt(posts[posts.length - 1].id, 10) + 1).toString()
      : '1';
    const newlyCreatedPost = { id, postContent };
    const updatedPosts = [...posts, newlyCreatedPost];
    setPosts(updatedPosts);

    const createdOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newlyCreatedPost),
    };

    try {
      const response = await fetch(APP_API_URL, createdOptions);
      if (!response.ok) {
        throw new Error('Error creating post');
      }
      setFetchError(null); 
    } catch (error) {
      setFetchError(error.message); 
      setPosts(posts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    handleCreatePost(newPostContent.trim());
    setNewPostContent('');
  };

  return (
    <section>
      {fetchError && (
        <p style={{ color: 'red' }}>Error: {fetchError}. Please try again.</p>
      )}
      <form className="postForm" onSubmit={handleSubmitPost}>
        <label htmlFor="createPost">Create New Post</label>
        <input
          autoFocus
          type="text"
          placeholder="Write your post here..."
          id="createPost"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.postContent}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Test;
