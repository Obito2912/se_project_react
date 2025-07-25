import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ClothesSection.css'
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({ onCardClick, clothingItems, onAddClick, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <div className="clothes-section">
            <div className='clothes-section__header'>
                <p className='clothes-section__title'>Your items</p>
                <button className='clothes-section__button' onClick={onAddClick}>+ Add new</button>
            </div>
            <ul className="clothes-section__items">
                {clothingItems
                    .filter(item => item.owner === currentUser?._id)
                    .map(card => (
                        <ItemCard
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                        />
                    ))
                }
            </ul>
        </div>
    );
}

export default ClothesSection