import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import { FiHome as IconHome,
    FiMenu as IconMenu,
    FiBox as IconCategory,
    FiBookOpen as IconPage,
    FiCalendar as IconEvent,
    FiUsers as IconUsers,
    FiImage as IconImage
 } from 'react-icons/fi';

export function MainMenu() {
    return (
        <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside 
            navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-dark bg-dark">
            <div className="navbar-vertical-container">
                <div className="navbar-vertical-footer-offset">
                    <div className="navbar-brand-wrapper justify-content-between">
                        <Link className="navbar-brand" to="/" aria-label="Front">
                            <img className="navbar-brand-logo" src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="navbar-vertical-content">
                        <div id="navbarVerticalMenu" className="nav nav-pills nav-vertical card-navbar-nav">
                            <span className="dropdown-header mt-4">Pages</span>
                            <small className="bi-three-dots nav-subtitle-replacer"></small>
                            <div id="navbarVerticalMenuPagesMenu">
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/">
                                        <IconHome size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Tableau de bord</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/menu-items">
                                        <IconMenu size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Menu</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/pages">
                                        <IconPage size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Pages</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/events">
                                        <IconEvent size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Evènements</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/members">
                                        <IconUsers size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Membres</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/gallerys">
                                        <IconImage size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Gallery</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/gallery-types">
                                        <IconCategory size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Types gallery</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div className="navbar-vertical-footer">Footer</div>
                </div>
            </div>
        </aside>
    )
} 