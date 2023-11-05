import { NavLink } from "react-router-dom";
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
            <ProfileButton user={user} isLoaded={isLoaded}/>
        </nav>
    );
};

export default Navigation;
