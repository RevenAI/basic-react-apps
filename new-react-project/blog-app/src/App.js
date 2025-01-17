import { Routes, Route, useNavigate } from  'react-router-dom';
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import PostPage from "./components/PostPage";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import data from "./database/posts.json";
import NewPost from './components/NewPost';

function App() {
  const [posts, setPosts] = useState(data.posts || []);
  const [search, setSearch] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter((post) => (post.title).toLowerCase().includes(search.toLowerCase()) || (post.body).toLowerCase().includes(search.toLowerCase()));

    setSearchResults(filteredResults);
  }, [search, posts]);

    const handleDelete = (id) => {
      const deletedPost = posts.find((post) => post.id.toString() === id.toString());

      const newPost = posts.filter((post) => post.id.toString() !== id.toString());

      setPosts(newPost);

      setDeleteMsg(`Post with title: ${ deletedPost.title } has been successfully deleted.`);

      setTimeout(() => {
        setDeleteMsg('');
        navigate('/');
      }, 9000);
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!postTitle || !postBody) {
        alert('Title ield and Post ield cannot be empty.');
        return;
      }

      const id = posts.length > 0 ? posts[posts.length-1].id +1 : 1;
      const createdPost = { id, title: postTitle, body: postBody, datetime: new Date().toISOString() };
      const allPosts = [...posts, createdPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate(`/post/${ id }`);
    }

    const handleContactForm = (e) => {
      e.preventDefault();
      if (contactEmail) {
        alert(`Complaint from "${ contactEmail }" has been rocorded and we will reach out as soon as we're available.`);
      }
    }

    return (
      <div className='App'>
      <Header title={data.appSettings[0].title}/>
      <Nav 
      search={search}
      setSearch={setSearch}
      />
        <Routes>
            <Route path='/' element={ <Home
             posts={searchResults}
             /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/contact' element={ <Contact 
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            handleContactForm={handleContactForm}
            /> } />
            <Route path='/posts' element={ <Posts /> } />
            <Route path='/new-post' element={ <NewPost 
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
            /> } />
            <Route path='/post/:id' element={ <PostPage
            posts={posts}
            handleDelete={handleDelete}
            deleteMsg={deleteMsg}
            /> } />
            <Route path='*' element={ <NotFound /> } />
        </Routes>
        
      <Footer />
      </div>
    )
}

export default App;

