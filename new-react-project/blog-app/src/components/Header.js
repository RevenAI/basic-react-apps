import { FaLaptop, FaTabletAlt , FaMobileAlt } from 'react-icons/fa';
import DataContext from '../contex/DataContext';
import { useContext } from 'react';

const Header = () => {
  const { settingsErrors, width, settings, isSettingsLoading } = useContext(DataContext);

  return (
    <div className="Header">
      { settingsErrors && `Error: ${ settingsErrors }`}
      { !isSettingsLoading && settings.length ? <h1>{ settings[0].title }</h1> : <h1 className='successMsg'>"Loading..."</h1> }
      { 
        width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt  /> : <FaLaptop />
      }
    </div>
  )
}

export default Header





