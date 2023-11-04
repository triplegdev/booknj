import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

const Navigation = ({ isLoaded }) => {
    const user = useSelector(state => state.session.user);
    return (
        <nav className="nav__header">
            <NavLink exact to="/">Home</NavLink>
            <ProfileButton user={user} isLoaded={isLoaded}/>
        </nav>
    );
};

export default Navigation;
