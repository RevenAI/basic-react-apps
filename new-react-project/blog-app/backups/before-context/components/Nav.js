import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    return (
      <nav className='Nav'>
        <form className='searchForm'>
        <lebel htmlFor='search'>Search Post</lebel>
        <input
        id='search'
        type='text'
        placeholder='Search post here...'
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        />
        </form>

        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          <li><Link to='/new-post'>New Post</Link></li>
        </ul>
      </nav>

    )
  }
  
  export default Nav
  