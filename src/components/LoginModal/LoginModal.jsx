import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, handleSignUpClick, onSignIn }) {
  return (
    <ModalWithForm
      title={"Log In"}
      buttonText={"Log In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSignIn}
      classNames={{
        form: "login__form",
      }}
      secondaryBtn={
        <button
          type="button"
          onClick={handleSignUpClick}
          className="modal__submit secondary__option"
        >
          Or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email">
        Email
        <input type="email" name="email" id="login-email" required />
      </label>
      <label htmlFor="login-password">
        Password
        <input type="password" name="password" id="login-password" required />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
