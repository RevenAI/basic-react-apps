import Feed from './Feed';

const Home = ({ posts, deleteMsg }) => {
  return (
    <main className="Home">
      {deleteMsg && <h5 className="errorMsg">{deleteMsg}</h5>}
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <h2>No post to display.</h2>
      )}
    </main>
  );
};

export default Home;
