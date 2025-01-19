import { Routes, Route, useNavigate } from  "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Nav from "./components/Nav";
import PostPage from "./components/PostPage";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import api from "./apiRequest/apiRequest";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [postOkMessage, setPostOkMessage] = useState('');
  const [editOkMessage, setEditOkMessage] = useState('');
  const [postErrors, setPostErrors] = useState(null);
  const [settingsErrors, setSettingsErrors] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [editErrors, setEditErrors] = useState(null);
  const [deleteErrors, setDeleteErrors] = useState(null);

  const navigate = useNavigate();
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const catchErr = (err, setErr) => {
    if (api.isCancel(err)) {
      setErr(`Request canceled: ${err.message}`);
    } else if (err.response) {
      setErr(err.response.data.message || 'An error occurred');
    } else {
      setErr(err.message || 'Network error occurred');
    }
  };

  const fetchData = async (url, setData, setErr, setLoading, source) => {
    try {
      const response = await api.get(url, { cancelToken: source.token });
      setData(response.data);
      setErr(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        setErr(`Request canceled: ${ err.message }`);
      } else if (err.response) {
        setErr(err.response.data.message || 'An error occurred');
      } else {
        setErr(err.message || 'Network error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchPost = async () => {
    await fetchData('/posts', setPosts, setPostErrors, setIsPostLoading, source);
  }

  fetchPost();
    return () => {
      source.cancel('Operation canceled.')
    };
  }, [source]);

  useEffect(() => {
    fetchData('/app-settings', setSettings, setSettingsErrors, setIsSettingsLoading, source);
    
    return () => {
      source.cancel('Operation canceled.')
    };
  }, [source]);
 
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      const id = posts.length > 0 ? (parseInt(posts[posts.length-1].id, 10) +1).toString() : '1';    
      const createdPost = { id, title: postTitle, body: postBody, datetime: new Date().toISOString() };
      
      try {
      const response = await api.post('/posts', createdPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostOkMessage(response.data.message);
      setPostErrors(null);
      setPostTitle('');
      setPostBody('');
      navigate(`/post/${ id }`);
      } catch (err) {
        catchErr(err, setPostErrors);
        setPostOkMessage('');
      } finally {
        setIsPostLoading(false);
      }
    }

    const handleEdit = async (id) => {
      const editedPost = { id, title: editTitle, body: editBody, datetime: new Date().toISOString() };

      try {
        const response = await api.put(`posts/${ id }`, editedPost);
        setPosts(
          posts.map((post) => post.id.toString() === id.toString() ? { ...post, ...response.data } : post)
        );
        setEditOkMessage(response.data.message);
        setEditErrors(null);
        setEditTitle('');
        setEditBody('');
        navigate(`post/${ id }`);
      } catch (err) {
        catchErr(err, setEditErrors);
        setEditOkMessage('');
      }
    }

    const handleDelete = async (id) => {
      try {
       const deletedPost = await api.delete(`/posts/${ id }`);
       const deletedMsg = `Post with title: ${ deletedPost.title } has been successfully deleted.`;
       //const deletedPost = posts.find((post) => post && post.id.toString() === id.toString());
 
       const newPosts = posts.filter((post) => post && post.id.toString() !== id.toString());
       
       setPosts(newPosts);
       setDeleteMsg(deletedMsg);
       setDeleteErrors(null);
       navigate('/');
 
      } catch (err) {
       catchErr(err, setDeleteErrors);
       setEditOkMessage('');
     }
    }
 
    const handleContactForm = (e) => {
      e.preventDefault();
      if (contactEmail) {
        alert(`Complaint from "${ contactEmail }" has been rocorded and we will reach out as soon as we're available.`);
      }
    }

    useEffect(() => {
      const filteredResults = posts.filter((post) => {
        if (!post.title || !post.body) {
          if (process.env.NODE_ENV === 'development') {
            console.log("Invalid post detected: ", post);
            return false;
          }
        }
      
        return (
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.body.toLowerCase().includes(search.toLowerCase())
        );
      });   
      setSearchResults(filteredResults.reverse());
    }, [search, posts]);
 
    return (
      <div className='App'>
      <Header title={ 
        settings.length && !isSettingsLoading ? settings[0].title : 'Loading...'
       }
       settingsErrors={settingsErrors}
       />
      <Nav 
      search={search}
      setSearch={setSearch}
      />
        <Routes>
            <Route path='/' element={ <Home
             posts={ searchResults }
             deleteMsg={deleteMsg}
             isPostLoading={isPostLoading}
             /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/contact' element={ <Contact 
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            handleContactForm={handleContactForm}
            /> } />
            <Route path='/new-post' element={ <NewPost 
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
            postErrors={postErrors}
            /> } />
            <Route path='/edit/:id' element={ <EditPost 
            posts={posts}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            handleEdit={handleEdit}
            editErrors={editErrors}
            editOkMessage={editOkMessage}
            /> } />
            <Route path='/post/:id' element={ <PostPage
            posts={posts}
            handleDelete={handleDelete}
            postOkMessage={postOkMessage}
            deleteErrors={deleteErrors}
            /> } />
            <Route path='*' element={ <NotFound /> } />
        </Routes>
        
      <Footer />
      </div>
    )
}

export default App;

