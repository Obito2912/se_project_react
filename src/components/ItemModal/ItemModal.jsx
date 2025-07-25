import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './ItemModal.css'
import button from '../../images/close-btn.svg'

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen && 'modal__opened'}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={button} alt="Close button" />
        </button>
        <img src={card.imageUrl} alt={`${card.name} image`} className="modal__image" />
        <div className="modal__footer-container">
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && <button onClick={() => onDeleteClick(card)} className="modal__delete-item">Delete Item</button>}
        </div>
      </div>
    </div>
  )
}

export default ItemModal