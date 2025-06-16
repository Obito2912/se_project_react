import './Header.css'
import avatar from '../../images/avatar.svg'
import logo from '../../images/logo.svg'

function Header({ handleAddClick, weatherData }) {

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header">
      <img className='header__logo' src={logo} alt="Logo Image" />
      <p className="header__date-location">{currentDate}, {weatherData.city}</p>
      <button type='button' onClick={handleAddClick} className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne Image" className="header__avatar" />
      </div>
    </header>
  )
}

export default Header