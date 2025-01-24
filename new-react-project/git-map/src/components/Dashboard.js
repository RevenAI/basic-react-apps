import { Outlet, Link, NavLink, useParams } from "react-router-dom";

const Dashboard = () => {
    const { id } = useParams();

  return (
    <section>
      <header>
        <h1>{ `Current user ID is: ${ id } `}</h1>
        <nav>
            <ul>
                <li><NavLink to='/' style={({isActive})=> ({color: isActive ? 'red' : 'green'})}>Back Home</NavLink></li>
                <li><Link to='about'>About Us</Link></li>
                <li><Link to='contact'>Contact Us</Link></li>
                <li><Link to='profile'>My Profile</Link></li>
                <li><Link to={ `profile/update/23` }>Update My Profile</Link></li>
            </ul>
        </nav>
      </header>

      <section>
      <Outlet />
      </section>
    </section>
  )
}

export default Dashboard
