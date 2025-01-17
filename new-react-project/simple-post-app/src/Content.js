import Users from './Users';
import Posts from './Posts';
import Comments from './Comments';

const Content = ({ users, posts, comments }) => {
  return (
    <>
      <div className="content-display">
        {users.length > 0 && <Users users={users} />}
        {posts.length > 0 && <Posts posts={posts} />}
        {comments.length > 0 && <Comments comments={comments} />}
      </div>
    </>
  );
};

export default Content;





