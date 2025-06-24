// UTILITIES
import { useEffect, useState } from 'react'
import { getWeather, filterWeatherData } from '../../utils/weatherApi'
import { coordinates, APIkey } from '../../utils/constants'
import { Routes, Route } from 'react-router-dom'

// COMPONENTS
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ItemModal from '../ItemModal/ItemModal'
import AddItemModal from '../AddItemModal/AddItemModal'
import CurrentTemperatureUnitContext from '../contexts/CurrentTemperatureUnitContext'
import Profile from '../Profile/Profile'

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

  const onClose = () => {
    setActiveModal('');
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

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className='page'>
        <div className="page__content">
          {isWeatherDataLoaded && (
            <>
              <Header handleAddClick={handleAddClick} weatherData={weatherData} />
              <Routes>
                <Route path='/' element={<Main handleCardClick={handleCardClick} weatherData={weatherData} />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </>
          )}
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={onClose} />
        <ItemModal isOpen={activeModal === "preview"} card={selectedCard} onClose={onClose} />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  )
}

export default App
