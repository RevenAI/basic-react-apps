import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <article className='post'>
       
            <Link to={ `/post/${post.id}` }>
            <h4>{ post.title }</h4>
            <p>{ post.datetime }</p>    
            </Link>

            <p className='postBody'>
               {
                post.body && post.body.length <= 10 ?
                post.body :
                `${ post.body.slice(0, 50) }...`
               }
            </p>
        
    </article>
  )
}

export default Post