import './Profile.css'
import SideBar from './SideBar'
import ClothesSection from './ClothesSection'

function Profile({ onCardClick, clothingItems, handleAddClick }) {
    return (
        <div className='profile'>
            <section className='profile__sidebar'>
                <SideBar />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} onAddClick={handleAddClick} />
            </section>
        </div>
    );
}

export default Profile