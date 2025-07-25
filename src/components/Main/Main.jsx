import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import './Main.css'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import { useContext } from 'react'

function Main({ weatherData, onCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className='cards'>
        <p className="cards__text">Today is {weatherData.temp[currentTemperatureUnit]} &deg;{currentTemperatureUnit} / You may want to wear:</p>
        <ul className="cards__list">
          {clothingItems
            .filter(card => card.weather === weatherData.type)
            .map(filteredCard => {
              return (
              <ItemCard
              key={filteredCard._id}
              card={filteredCard}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
               />
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default Main