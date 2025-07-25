import './LoginModal.css';
import button from '../../images/close-btn.svg';

function LoginModal({ onClose, isOpen, handleSignUpClick, onSignIn }) {
    return (
        <div className={`modal ${isOpen && 'modal__opened'}`}>
            <div className="modal__content">
                <h2 className="modal__title">Log In</h2>
                <button onClick={onClose} type="button" className="modal__close">
                    <img src={button} alt="Close button" />
                </button>

                <form onSubmit={onSignIn} className="modal__form login__modal">
                    <label htmlFor="login-email">Email
                        <input type="email" name='email' id='login-email' required />
                    </label>
                    <label htmlFor="login-password">Password
                        <input type="password" name='password' id='login-password' required />
                    </label>
                    <div className="modal__button-container">
                        <button type='submit' className={`modal__submit ${isOpen ? 'main__btn' : ''}`}>Log In</button>
                        <button type='button' onClick={handleSignUpClick} className={`modal__submit ${isOpen ? 'secondary__option' : ''}`}>Or Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LoginModal