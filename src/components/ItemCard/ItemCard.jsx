import "./ItemCard.css";
import likeBtn from "../../images/default-like-btn.svg";
import dislikeBtn from "../../images/filled-like-btn.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ card, onCardClick, onCardLike }) {
  const token = localStorage.getItem("jwt");
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.includes(currentUser?._id);

  const handleLikeClick = () => {
    onCardLike({ id: card._id, isLiked }, token);
  };

  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <button onClick={handleLikeClick} className="card__like-button">
          {currentUser && (
            <img
              className="card__like-icon"
              src={isLiked ? dislikeBtn : likeBtn}
              alt={isLiked ? "Unlike" : "Like"}
            />
          )}
        </button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={card.imageUrl}
        alt={card.name}
      />
    </li>
  );
}

export default ItemCard;
