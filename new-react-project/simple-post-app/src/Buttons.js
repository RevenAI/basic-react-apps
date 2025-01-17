const Buttons = ({ isLoading, handleUserClick, handlePostClick, handleCommentClick }) => {
  return (
    <div className="container">
      <button 
        type="button" 
        className="userButton"
        disabled={isLoading}
        onClick={handleUserClick}
      >
        {isLoading ? 'Loading...' : 'Users'}
      </button>

      <button 
        type="button" 
        className="postButton"
        disabled={isLoading}
        onClick={handlePostClick}
      >
        {isLoading ? 'Loading...' : 'Posts'}
      </button>

      <button 
        type="button" 
        className="commentButton"
        disabled={isLoading}
        onClick={handleCommentClick}
      >
        {isLoading ? 'Loading...' : 'Comments'}
      </button>
    </div>
  );
};

export default Buttons