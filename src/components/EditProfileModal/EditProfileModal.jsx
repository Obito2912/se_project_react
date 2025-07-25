import './EditProfileModal.css';
import button from '../../images/close-btn.svg';
import { useState } from 'react';

function EditProfileModal({ onUpdateSubmit, isOpen, onClose }) {
    const [isValid, setIsValid] = useState(false);

    return (
        <div className={`modal ${isOpen && 'modal__opened'}`}>
            <div className="modal__content">
                <h2 className="modal__title">Change profile data</h2>
                <button onClick={onClose} type="button" className="modal__close">
                    <img src={button} alt="Close button" />
                </button>

                <form onChange={(e) => setIsValid(e.currentTarget.checkValidity())} onSubmit={onUpdateSubmit} className="modal__form update__modal">
                    <label htmlFor="update-name">Name *
                        <input className='update__modal_name' type="text" name='name' id='update-name' minLength={2} required />
                    </label>
                    <label htmlFor="update-avatar">Avatar *
                        <input className='update__modal_avatar' type="url" name='avatar' id='update-avatar' required />
                    </label>
                    <div className="modal__button-container">
                        <button type='submit' className='modal__submit' disabled={!isValid}>Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditProfileModal