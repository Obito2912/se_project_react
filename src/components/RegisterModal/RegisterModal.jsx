import './RegisterModal.css';
import button from '../../images/close-btn.svg';

function RegisterModal({ onClose, isOpen, handleLogInClick, onRegister }) {
    return (
        <div className={`modal ${isOpen && 'modal__opened'}`}>
            <div className="modal__content">
                <h2 className="modal__title">Sign Up</h2>
                <button onClick={onClose} type="button" className="modal__close">
                    <img src={button} alt="Close button" />
                </button>

                <form onSubmit={onRegister} className="modal__form register__modal">
                    <label htmlFor="register-email">Email*
                        <input type="email" required name='email' id='register-email' />
                    </label>
                    <label htmlFor="register-password">Password*
                        <input type="password" required name='password' id='register-password' />
                    </label>
                    <label htmlFor="register-name">Name*
                        <input type="text" required name='name' id='register-name' />
                    </label>
                    <label htmlFor="register-avatar">Avatar URL*
                        <input type="url" required name='avatar' id='register-avatar' />
                    </label>
                    <div className="modal__button-container">
                        <button type='submit' className={`modal__submit ${isOpen && 'main__btn'}`}>Sign Up</button>
                        <button type='button' onClick={handleLogInClick} className={`modal__submit ${isOpen && 'secondary__option'}`}>Or Log In</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default RegisterModal