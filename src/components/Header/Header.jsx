import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import avatar from "../../images/avatar.svg";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleLogInClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Logo Image" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && currentUser ? (
        <>
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to={"/profile"} className="header__user-container">
            <p className="header__username header__link">{currentUser?.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser?.avatar}
                alt={`${currentUser?.name}'s avatar`}
                className="header__avatar header__link"
              />
            ) : (
              <div className="header__avatar_placeholder">
                <span className="header__avatar_initial">
                  {currentUser.name[0]}
                </span>
              </div>
            )}
          </Link>
        </>
      ) : (
        <div className="header__auth">
          <button onClick={handleSignUpClick} className="header__signup-btn">
            Sign Up
          </button>
          <button onClick={handleLogInClick} className="header__login-btn">
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
