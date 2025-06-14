import WeatherCard from '../WeatherCard/WeatherCard'
import { defaultClothingItems } from '../../utils/constants'
import ItemCard from '../ItemCard/ItemCard'
import './Main.css'

function Main({ weatherData }) {

  return (
    <main>
      <WeatherCard  />
      <section className='cards'>
        <p className="cards__text">Today is 75° F / You may want to wear:</p>
        <ul className="cards__list">
          {
            defaultClothingItems.filter(item => {
              return item.weather === weatherData.type
            })
            .map(item => {
              return <ItemCard key={item._id} item={item}/>
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default Main