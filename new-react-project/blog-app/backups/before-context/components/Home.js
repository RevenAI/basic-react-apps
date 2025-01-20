import Feed from './Feed';

const Home = ({ posts, deleteMsg, isPostLoading }) => {
  return (
    <main className="Home">
      {deleteMsg && <h5 className="errorMsg">{deleteMsg}</h5>}
      { isPostLoading && <h5 className="successMsg">Loading posts...</h5>}
      <>
      { !isPostLoading && posts.length ? (
        <Feed posts={posts} />
      ) : (
        <h5 className="errorMsg">No post to display.</h5> 
      )}
      </>
    </main>
  );
};

export default Home;
