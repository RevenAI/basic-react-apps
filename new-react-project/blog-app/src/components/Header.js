
const Header = ({ title, settingsErrors }) => {
  return (
    <div className="Header">
      { settingsErrors ? `Error: ${ settingsErrors }` : <h1>{ title }</h1>}
    </div>
  )
}

export default Header
