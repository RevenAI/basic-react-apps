import { useParams, Link } from "react-router";

const PostPage = ({ posts, handleDelete, postOkMessage, deleteErrors }) => {
  const { id } = useParams();
 
  const post = posts.find((post) => post?.id?.toString() === id?.toString());

  if (!post) {
    return <>
    <h3 className='errorMsg'>No post found.</h3>
    <h3><Link to={ '/' }>Visit Our Homepage</Link></h3>
    </>
  }

   return (
      <main className='PostPage'>
       <article className='post'>
      <>
       <h2>{ post.title }</h2>
       { postOkMessage && <h5 className='successMsg'>{postOkMessage}</h5> }

       <p className='postDate'>{ post.datetime }</p>
        <p className='postBody'>{ post.body }</p>

        { deleteErrors && <h5 className='errorMsg'>{deleteErrors}</h5> }
        <Link to={`/edit/${post.id}`}>
        <button className='editButton' type='button'>
          Edit Post
        </button>
        </Link>
        <button className='deleteButton' type='button' onClick={ () => handleDelete(post.id.toString()) }>
          Delete Post
        </button>
      </>
       </article>
      </main>
    )
  }
  
  export default PostPage
  