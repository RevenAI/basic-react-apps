import { Routes, Route, useNavigate } from "react-router-dom";
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
  const [search, setSearch] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [postOkMessage, setPostOkMessage] = useState("");
  const [editOkMessage, setEditOkMessage] = useState("");
  const [postErrors, setPostErrors] = useState(null);
  const [settingsErrors, setSettingsErrors] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [editErrors, setEditErrors] = useState(null);
  const [deleteErrors, setDeleteErrors] = useState(null);

  const navigate = useNavigate();

  const catchErr = (err, setErr) => {
    if (axios.isCancel(err)) {
      setErr(`Request canceled: ${err.message}`);
    } else if (err.response) {
      setErr(err.response.data.message || "An error occurred");
    } else {
      setErr(err.message || "Network error occurred");
    }
  };

  const clearSetData = (actionFunction, limitTime) => {
    if (limitTime !== 'number') throw new Error('Limit time must be a valid numeric number');
    const timeoutId = setTimeout(() => {
      actionFunction(null);
    }, limitTime);
  
    return timeoutId;
  };  

  const fetchData = async (url, setData, setErr, setLoading, source) => {
    try {
      const response = await api.get(url, { cancelToken: source.token });
      setData(response.data);
      setErr(null);
    } catch (err) {
      catchErr(err, setErr);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData("/posts", setPosts, setPostErrors, setIsPostLoading, source);

    return () => {
      source.cancel("Operation canceled.");
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData("/app-settings", setSettings, setSettingsErrors, setIsSettingsLoading, source);

    return () => {
      source.cancel("Operation canceled.");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let id = posts.length > 0 ? parseInt(posts[posts.length - 1].id, 10) + 1 : 1;
  
    while (posts.find((post) => post.id.toString() === id.toString())) {
      id += 1; 
    }
  
    const createdPost = {
      id: id.toString(),
      title: postTitle,
      body: postBody,
      datetime: new Date().toISOString(),
    };
  
    try {
      const response = await api.post("/posts", createdPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setPostOkMessage(response.data.message);
      setPostTitle("");
      setPostBody("");
      navigate(`/post/${id}`);
      clearSetData(setPostOkMessage, 6000);
    } catch (err) {
      catchErr(err, setPostErrors);
    } finally {
      setIsPostLoading(false);
    }
  };
  
  const handleEdit = async (id) => {
    const editedPost = { id, title: editTitle, body: editBody, datetime: new Date().toISOString() };

    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id.toString() === id.toString() ? { ...post, ...response.data } : post))
      );
      setEditOkMessage(response.data.message);
      setEditTitle("");
      setEditBody("");
      navigate(`/post/${id}`);
      clearSetData(setEditOkMessage, 6000);
    } catch (err) {
      catchErr(err, setEditErrors);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id.toString() !== id.toString()));
      setDeleteMsg(`Post with ID ${id} has been successfully deleted.`);
      navigate('/');
      clearSetData(setDeleteMsg, 6000);
    } catch (err) {
      catchErr(err, setDeleteErrors);
    }
  };

  const handleContactForm = (e) => {
    e.preventDefault();
    if (contactEmail) {
      alert(`Complaint from "${contactEmail}" has been recorded. We will reach out as soon as possible.`);
    }
  };

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      [post.title, post.body].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    );
    setSearchResults(filteredResults.reverse());
  }, [search, posts]);

  return (
    <div className="App">
      <Header
        title={settings.length && !isSettingsLoading ? settings[0].title : "Loading..."}
        settingsErrors={settingsErrors}
      />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home 
        posts={searchResults} 
        deleteMsg={deleteMsg} 
        isPostLoading={isPostLoading} 
        />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={<Contact 
          contactEmail={contactEmail} 
          setContactEmail={setContactEmail} 
          handleContactForm={handleContactForm} 
          />}/>
        <Route
          path="/new-post"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
              postErrors={postErrors}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
              editErrors={editErrors}
              editOkMessage={editOkMessage}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage 
            posts={posts} 
            handleDelete={handleDelete} 
            postOkMessage={postOkMessage} 
            deleteErrors={deleteErrors} 
            />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

