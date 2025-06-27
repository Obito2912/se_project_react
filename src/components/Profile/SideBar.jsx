import './SideBar.css'
import avatar from '../../images/avatar.svg'

function SideBar() {
    return (
        <div className="sidebar">
            <img className='sidebar__avatar' src={avatar} alt="Avatar profile picture" />
            <p className="sidebar__username">User Name</p>
        </div>
    )
}

export default SideBar