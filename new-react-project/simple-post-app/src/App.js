import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Buttons from './Buttons';
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const USER_URL = 'http://localhost:3500/users/';
  const POST_URL = 'http://localhost:3500/posts/';
  const COMMENT_URL = 'http://localhost:3500/comments/';

  const handleClick = async (url, setLoadingFn, setEntitiesFn, setErrFn, entityName ) => {
   
    if (!url || typeof url !== 'string') throw new Error('URL not provided or invalid.');

    if (!setEntitiesFn || !setLoadingFn || !setErrFn || !entityName) throw new Error('Error: One of the arguments is missing or invalid.')

    const Entity_URL = url;
    setLoadingFn(true);
    try {
      const response = await fetch(Entity_URL);
      if (!response.ok) throw new Error(`Error fetching ${ entityName.toLowerCase() }.`);
      const entities = await response.json();
      setEntitiesFn(entities);
      setErrFn(null);
    } catch (error) {
      setErrFn(error.message);
    } finally {
      setLoadingFn(false);
    }
};

const handleUserClick = () => {
  handleClick(USER_URL, setIsLoading, setUsers, setErr, 'Users')
}

const handlePostClick = () => {
  handleClick(POST_URL, setIsLoading, setPosts, setErr, 'Posts');
};

const handleCommentClick = () => {
  handleClick(COMMENT_URL, setIsLoading, setComments, setErr, 'Comments');
};

  return (
    <div className='App'>
      <Header title='Blog App' />

      <main>
        <Buttons 
        isLoading={isLoading} 
        handleUserClick={handleUserClick}
        handlePostClick={handlePostClick}
        handleCommentClick={handleCommentClick}
        />
        {
        err && <p style={{ color: 'red' }}>{err}</p>}
        {isLoading && !err && <p style={{ color: 'green' }}>Loading...</p>}
        {!err && !isLoading && users.length > 0 && <Content 
        users={users}
        posts={posts}
        comments={comments} 
        />
        }
      </main>

      <Footer />
    </div>
  );
}

export default App;
