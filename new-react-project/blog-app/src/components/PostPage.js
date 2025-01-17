import { useParams, Link } from "react-router";

const PostPage = ({ posts, handleDelete, deleteMsg }) => {
  const { id } = useParams();
 
  const post = posts.find((post) => post.id.toString() === id.toString());
  const errStyling = { color: 'red', textAlign: 'center' };

  if (!post) {
    return <>
    <h3 style={errStyling}>No post found.</h3>
    { deleteMsg && <h5 style={errStyling}>{ deleteMsg }</h5> }
    <h3><Link to={ '/' }>Visit Our Homepage</Link></h3>
    </>
  }

   return (
      <main className='PostPage'>
       <article className='post'>
      <>
       <h2>{ post.title }</h2>
       <p className='postDate'>{ post.datetime }</p>
        <p className='postBody'>{ post.body }</p>
        <button type='button' onClick={ () => handleDelete(post.id.toString()) }>
          Delete Post
        </button>
      </>
       </article>
      </main>
    )
  }
  
  export default PostPage
  