import { Link } from 'react-router-dom'
import './Header.css'
import avatar from '../../images/avatar.svg'
import logo from '../../images/logo.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'

function Header({ handleAddClick, weatherData }) {

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header">
      <Link to='/' className='header__logo-link'>
        <img className='header__logo' src={logo} alt="Logo Image" />
      </Link>
      <p className="header__date-location">{currentDate}, {weatherData.city}</p>
      <ToggleSwitch />
      <button type='button' onClick={handleAddClick} className="header__add-clothes-btn">+ Add clothes</button>
      <Link to={'/profile'} className="header__user-container">
        <p className="header__username header__link">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne Image" className="header__avatar header__link" />
      </Link>
    </header>
  )
}

export default Header