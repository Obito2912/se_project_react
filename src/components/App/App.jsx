// UTILITIES
import { useEffect, useState } from 'react'
import { getWeather, filterWeatherData } from '../../utils/weatherApi'
import { coordinates, APIkey } from '../../utils/constants'
import { Routes, Route } from 'react-router-dom'
import { getItems, addItem, deleteItem } from '../../utils/api'

// COMPONENTS
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import AddItemModal from '../AddItemModal/AddItemModal'
import ItemModal from '../ItemModal/ItemModal'
import CurrentTemperatureUnitContext from '../contexts/CurrentTemperatureUnitContext'
import Profile from '../Profile/Profile'
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal'

// STYLES
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState({
    city: '',
    temp: { F: 999, C: 999 },
    type: '',
    condition: '',
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card)
  }

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal('delete-garment');
  }

  const onClose = () => {
    setActiveModal('');
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    // const newId = Math.max(...clothingItems.map(item => item._id)) + 1;
    // Update clothingItems Array
    addItem({ name, imageUrl, weather })
      .then(newItem => setClothingItems(prev => [newItem, ...prev]))
      .catch(console.error);
    // setClothingItems(prevItems => [{ name, imageUrl, weather/* , _id: newId */}, ...prevItems]);
    // Close the modal
    onClose();
  }

  const handleDeleteItemModalSubmit = (e, itemId) => {
    e.preventDefault();
    deleteItem(itemId)
      .then(() => setClothingItems(prev => prev.filter(item => item._id !== itemId)))
      .catch(console.error);
    onClose();
  }

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
    getItems().then(data => {
      console.log(data);
      // set clothing items 
      setClothingItems(data)
    })
      .catch(console.error)
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className='page'>
        <div className="page__content">
          {isWeatherDataLoaded && (
            <>
              <Header handleAddClick={handleAddClick} weatherData={weatherData} />
              <Routes>
                <Route path='/' element={
                  <Main
                    onCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                  />} />
                <Route path='/profile' element={<Profile onCardClick={handleCardClick} clothingItems={clothingItems} />} />
              </Routes>
            </>
          )}
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={onClose}
          onAddItemModalSubmit={handleAddItemModalSubmit} />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={onClose}
          onDeleteClick={handleDeleteClick} />
        <DeleteItemModal
          isOpen={activeModal === 'delete-garment'}
          onDeleteClick={handleDeleteClick}
          onClose={onClose}
          onDeleteModalSubmit={(e) => handleDeleteItemModalSubmit(e, selectedCard._id)} />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  )
}

export default App
