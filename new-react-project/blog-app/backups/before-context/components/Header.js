import { FaLaptop, FaTabletAlt , FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, settingsErrors, width }) => {
  return (
    <div className="Header">
      { settingsErrors ? `Error: ${ settingsErrors }` : <h1>{ title }</h1>}
      { 
        width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt  /> : <FaLaptop />
      }
    </div>
  )
}

export default Header
