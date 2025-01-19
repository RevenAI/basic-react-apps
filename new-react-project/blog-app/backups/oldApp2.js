//This version of App.js is working perfectly. How errors are only logged tp the console which isn't the best practice for production. This version then replaced with updated version that handle errors with state.

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
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);    
        } else {
          console.log(err.message);
        }
      }
    }
    fetchPosts();
  }, []);
 
  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const response = await api.get('/app-settings');
        setSettings(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);    
        } else {
          console.log(err.message);
        }
      }
    }
    fetchSettingsData();  
  },[]);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!postTitle || !postBody) {
        alert('Title ield and Post ield cannot be empty.');
        return;
      }
      
      const id = posts.length > 0 ? (parseInt(posts[posts.length-1].id, 10) +1).toString() : '1';    
      const createdPost = { id, title: postTitle, body: postBody, datetime: new Date().toISOString() };
      
      try {
      const response = await api.post('/posts', createdPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate(`/post/${ id }`);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);    
        } else {
          console.log(err.message);
        }
      }
    }

    const handleEdit = async (id) => {
      const editedPost = { id, title: editTitle, body: editBody, datetime: new Date().toISOString() };

      try {
        const response = await api.put(`posts/${ id }`, editedPost);
        setPosts(
          posts.map((post) => post.id.toString() === id.toString() ? { ...post, ...response.data } : post)
        );
        setEditTitle('');
        setEditBody('');
        navigate(`post/${ id }`);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);    
        } else {
          console.log(err.message);
        }
      }
    }

    const handleDelete = async (id) => {
      try {
       await api.delete(`/posts/${ id }`);
 
       const deletedPost = posts.find((post) => post && post.id.toString() === id.toString());
 
       const newPosts = posts.filter((post) => post && post.id.toString() !== id.toString());
       setPosts(newPosts);
 
       setDeleteMsg(`Post with title: ${ deletedPost.title } has been successfully deleted.`);
 
       setTimeout(() => {
         setDeleteMsg('');
         navigate('/');
       }, 9000);
 
      } catch (err) {
       if (err.response) {
         console.log(err.response.data);
         console.log(err.response.status);
         console.log(err.response.headers);    
       } else {
         console.log(err.message);
       }
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
          console.log("Invalid post detected: ", post);
          return false;
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
        settings.length > 0 ? settings[0].title : 'Loading...'
       }/>
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
            <Route path='/new-post' element={ <NewPost 
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
            /> } />
            <Route path='/edit/:id' element={ <EditPost 
            posts={posts}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            handleEdit={handleEdit}
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

