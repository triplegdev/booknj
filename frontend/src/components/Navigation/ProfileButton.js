import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal";
import Avatar from "./Avatar";
import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logoutSession = (e) => {
        e.preventDefault();
        dispatch(logout());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <div className="profile__button-container">
                <button className="profile__button" onClick={openMenu}>
                    <i className="fa-solid fa-bars"></i>
                    <div className="avatar-container">
                        <Avatar />
                    </div>

                </button>
            </div>
            <ul className={ulClassName} ref={ulRef}>
                { !user ?
                <>
                <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignUpFormModal />}
                />
                </>
                :
                <>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li id="menu__email">{user.email}</li>
                <hr className="menu__line" />
                <li id="menu__manage-spots"><Link to="/spots/current" onClick={closeMenu}>Manage Spots</Link></li>
                <hr className="menu__line" />
                <li>
                <button className="menu__logout" onClick={logoutSession}>Log Out</button>
                </li>
                </>
                }
            </ul>
        </div>
    );
};

export default ProfileButton;
