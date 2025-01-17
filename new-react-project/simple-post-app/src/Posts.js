const Posts = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p><strong>Title:</strong> {post.title}</p>
            <p><strong>Body:</strong> {post.body}</p>
            <p><strong>Creator:</strong> {post.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;



/* const Posts = ({ posts }) => {
  return (
    <div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(posts, null, 2)}
      </pre>
    </div>
  );
};

export default Posts;

 */
  