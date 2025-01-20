import { useContext, useState } from "react"
import DataContext from "../contex/DataContext"
import { useNavigate } from "react-router-dom";
import { catchErr, clearSetData } from "../utils/helpers";
import api from "../apiRequest/apiRequest";

const NewPost = () => {
 const [postBody, setPostBody] = useState("");
 const [postTitle, setPostTitle] = useState("");

 const {
            postErrors,
            posts,
            setPosts,
            setPostOkMessage,
            setIsPostLoading,
            setPostErrors
 } = useContext(DataContext);

 const navigate = useNavigate();
 
 const handleSubmit = async (e) => {
  e.preventDefault();

  let id = posts.length > 0 ? parseInt(posts[posts.length - 1].id, 10) + 1 : 1;

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
    clearSetData(setPostOkMessage, 3000);
  } catch (err) {
    catchErr(err, setPostErrors);
  } finally {
    setIsPostLoading(false);
  }
};

  return (
   <main className='NewPost'>
    <h2 className='successMsg'>Create New Post</h2>
    <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='newPostTitle'>Post Title</label>
        <input
        id='newPostTitle'
        type='text'
        required
        value={ postTitle }
        onChange={ (e) => setPostTitle(e.target.value) }
        />

        <label htmlFor='newPostBody'>New Post</label>
        <textarea
        id='newPostBody'
        required
        value={ postBody }
        onChange={ (e) => setPostBody(e.target.value) }
        />
      { postErrors && <h5 className='errorMsg'>Error: ${ postErrors }</h5>}
        <button type='submit'>
            Create Post
        </button>
    </form>
   </main>
  )
}

export default NewPost

