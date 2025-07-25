import './SideBar.css'
import avatar from '../../images/avatar.svg'
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SideBar({ onUpdateBtnClick, onSignOutClick }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <div className="sidebar">
            <div className='sidebar__user-info'>
                {currentUser.avatar ?
                    <img className='sidebar__avatar' src={currentUser.avatar} alt={`${currentUser.avatar}'s avatar`} />
                    :
                    <div className='sidebar__avatar_placeholder'>
                        <span className='sidebar__avatar_initial'>{currentUser.name[0]}</span>
                    </div>
                }
                <p className="sidebar__username">{currentUser?.name}</p>
            </div>
            <button onClick={onUpdateBtnClick} className='sidebar__update-btn'>Change profile data</button>
            <button onClick={onSignOutClick} className='sidebar__signout-btn'>Log Out</button>
        </div>
    )
}

export default SideBar