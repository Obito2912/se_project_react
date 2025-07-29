import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ onUpdateSubmit, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title={"Change profile data"}
      buttonText={"Save changes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onUpdateSubmit}
    >
      <label htmlFor="update-name">
        Name *
        <input
          className="update__modal_name"
          type="text"
          name="name"
          id="update-name"
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="update-avatar">
        Avatar *
        <input
          className="update__modal_avatar"
          type="url"
          name="avatar"
          id="update-avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
