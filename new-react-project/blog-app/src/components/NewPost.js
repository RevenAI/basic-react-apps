

const NewPost = ({
            postTitle,
            setPostTitle,
            postBody,
            setPostBody,
            handleSubmit,
}) => {

  return (
   <main className='NewPost'>
    <h2 style={{color: 'green', textAlign: 'center'}}>Create New Post</h2>
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

        <button type='submit'>
            Create Post
        </button>
    </form>
   </main>
  )
}

export default NewPost