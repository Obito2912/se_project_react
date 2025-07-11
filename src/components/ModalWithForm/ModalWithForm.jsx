import './ModalWithForm.css'
import button from '../../images/close-btn.svg'

function ModalWithForm({ children, buttonText, title, onClose, isOpen, onSubmit }) {

  return (
    <div className= {`modal ${isOpen && 'modal__opened'}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={button} alt="Close button" />
        </button>

        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type='submit' className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm