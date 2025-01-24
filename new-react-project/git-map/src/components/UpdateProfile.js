import { useParams } from "react-router-dom"

const UpdateProfile = () => {
    const { id } = useParams();

    if (!id) {
       return <div>
        <h1>No ID Found</h1>
        <p>Please provide a valid user ID in the URL.</p>
      </div>
    }

    return (
        <div>
        <h1>{ `Profile updated for ID: ${id}` }</h1>
        </div>
    )
}

export default UpdateProfile


/* 
Header, Nav, Footer, Home, NewPost, PostPage, About, NotFound
*/

//linkedin.com/in/ibrahim-tijani-369186252/


/* Hi Idongesit, I can see you're also in the frontend development. Can we connect on LinkedIn, I'd liked we share our interest and perhaps you could be my accountability partner in the track. Here is my LinkedIn profile link; linkedin.com/in/ibrahim-tijani-369186252/ */
