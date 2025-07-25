import './AddItemModal.css'
import { useEffect, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');

  const token = localStorage.getItem('jwt');

  useEffect(() => {
    // Empty the inputs
    setName('');
    setImageUrl('');
    setWeather('');
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  }

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather }, token);
  }
  
  return (
    <ModalWithForm
      title='New garment'
      buttonText='Add garment'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label htmlFor="name" className="modal__label">
        Name <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
          minLength={2} />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name='temperature'
            className="modal__radio-input"
            value='hot'
            checked={weather === 'hot'}
            onChange={handleWeatherChange}
            required />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name='temperature'
            className="modal__radio-input"
            value='warm'
            checked={weather === 'warm'}
            onChange={handleWeatherChange} />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name='temperature'
            className="modal__radio-input"
            value='cold'
            checked={weather === 'cold'}
            onChange={handleWeatherChange} />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal