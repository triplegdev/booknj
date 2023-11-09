import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import Logo from "./Logo";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
    const user = useSelector(state => state.session.user);
    return (
        <nav className="nav__header">
            <NavLink exact to="/">
                <Logo />
            </NavLink>
            {isLoaded &&
            <div className="nav__right">
                <div className="nav__create-spot">
                    {user && <Link to="/spots/new">Create a New Spot</Link> }
                </div>
                <ProfileButton user={user} />
            </div>
            }
        </nav>
    );
};

export default Navigation;
