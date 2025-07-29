import "./ModalWithForm.css";
import button from "../../images/close-btn.svg";
import { useState } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  classNames = {},
  secondaryBtn = null,
  onSubmit = null,
}) {
  const [isValid, setIsValid] = useState(false);
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={button} alt="Close button" />
        </button>

        <form
          onChange={(e) => setIsValid(e.currentTarget.checkValidity())}
          onSubmit={onSubmit}
          className={`modal__form ${classNames.form}`}
        >
          {children}
          <div className="modal__button-container">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>
            {secondaryBtn}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
