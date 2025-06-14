import { useState } from 'react'

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function App() {
  const [weatherData, setWeatherData] = useState({ type: 'hot' });
  const [activeModal, setActiveModal] = useState('');

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };
  
  const closeActiveModal = () => {
    setActiveModal('');
  };

  return (
    <div className='page'>
      <div className="page__content">
        <Header handleAddClick={handleAddClick}/>
        <Main weatherData={weatherData} />
      </div>
      <ModalWithForm
        title='New garment'
        buttonText='Add garment'
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}>
        <label htmlFor="name" className="modal__label">
          Name <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image Url"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input" />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label modal__label_type_radio">
            <input
              id="warm"
              type="radio"
              className="modal__radio-input" />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label modal__label_type_radio">
            <input
              id="cold"
              type="radio"
              className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  )
}

export default App
