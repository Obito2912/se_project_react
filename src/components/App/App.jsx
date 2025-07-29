// UTILITIES
import { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signIn, signUp, checkToken } from "../../utils/auth";

// COMPONENTS
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// STYLES
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 999 },
    type: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("jwt");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleLogInClick = () => {
    setActiveModal("log-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const avatar = e.target.avatar.value;

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  const onClose = () => {
    setActiveModal("");
  };

  const handleCardLike = ({ id, isLiked }, token) => {
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const avatar = e.target.avatar.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    signUp({ name, avatar, email, password })
      .then(() => signIn({ email, password }))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        console.log("Auto log-in after signing up:", userData);
        setCurrentUser(userData);
        setIsLoggedIn(true);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn({ email, password })
      .then((data) => {
        console.log("Login Successful:", data);
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }, token) => {
    // Update clothingItems Array
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        // setClothingItems(prevItems => [{ name, imageUrl, weather/* , _id: newId */}, ...prevItems]);
        setClothingItems((prev) => [newItem, ...prev]);
        // Close the modal
        onClose();
      })
      .catch(console.error);
  };

  const handleDeleteItemModalSubmit = (e, itemId, token) => {
    e.preventDefault();
    deleteItem(itemId, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        onClose();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        // set clothing items
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((userData) => {
          console.log("Token valid, user: ", userData);
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("Invalid token: ", err);
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            {isWeatherDataLoaded && (
              <>
                <Header
                  handleAddClick={handleAddClick}
                  weatherData={weatherData}
                  handleSignUpClick={handleSignUpClick}
                  handleLogInClick={handleLogInClick}
                  isLoggedIn={isLoggedIn}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        onCardClick={handleCardClick}
                        weatherData={weatherData}
                        clothingItems={clothingItems}
                        onCardLike={handleCardLike}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile
                          onCardClick={handleCardClick}
                          clothingItems={clothingItems}
                          handleAddClick={handleAddClick}
                          onUpdateBtnClick={handleEditProfileClick}
                          onSignOutClick={handleSignOut}
                          onCardLike={handleCardLike}
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </>
            )}
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={onClose}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={onClose}
            onDeleteClick={handleDeleteClick}
          />
          {activeModal === "sign-up" && (
            <RegisterModal
              isOpen={activeModal === "sign-up"}
              onClose={onClose}
              handleLogInClick={handleLogInClick}
              onRegister={handleRegister}
            />
          )}
          {activeModal === "log-in" && (
            <LoginModal
              isOpen={activeModal === "log-in"}
              onClose={onClose}
              handleSignUpClick={handleSignUpClick}
              onSignIn={handleSignIn}
            />
          )}
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={onClose}
            onUpdateSubmit={handleUpdateUser}
          />
          <DeleteItemModal
            isOpen={activeModal === "delete-garment"}
            onDeleteClick={handleDeleteClick}
            onClose={onClose}
            onDeleteModalSubmit={(e) =>
              handleDeleteItemModalSubmit(e, selectedCard._id, token)
            }
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
