import './Profile.css'
import SideBar from './SideBar'
import ClothesSection from './ClothesSection'

function Profile({ onCardClick, clothingItems, handleAddClick, onUpdateBtnClick, onSignOutClick, onCardLike }) {
    return (
        <div className='profile'>
            <section className='profile__sidebar'>
                <SideBar
                    onUpdateBtnClick={onUpdateBtnClick}
                    onSignOutClick={onSignOutClick} />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection
                onCardClick={onCardClick}
                clothingItems={clothingItems}
                onAddClick={handleAddClick}
                onCardLike={onCardLike} />
            </section>
        </div>
    );
}

export default Profile