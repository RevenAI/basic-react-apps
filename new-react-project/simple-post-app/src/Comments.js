const Comments = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p><strong>Name:</strong> {comment.name}</p>
            <p><strong>Body:</strong> {comment.body}</p>
            <p><strong>Post:</strong> {comment.postId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;



/* const Comments = ({ comments }) => {
  return (
    <div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(comments, null, 2)}
      </pre>
    </div>
  );
};

export default Comments;

 */
  