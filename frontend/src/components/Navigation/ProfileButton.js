import "./ProfileButton.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const ProfileButton = ({ user, isLoaded }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

    const logoutSession = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <div className="profile__button-container">
                <button className="profile__button" onClick={openMenu}>
                    <i className="fa-solid fa-bars"></i>
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            { isLoaded &&
            <ul className={ulClassName} ref={ulRef}>
                { !user ?
                <>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
                </>
                :
                <>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                <button onClick={logoutSession}>Log Out</button>
                </li>
                </>
                }
            </ul>
            }
        </div>
    );
};

export default ProfileButton;
