import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { signup } from '../../store/session';
import "./SignUpForm.css";

const SignUpFormModal = () => {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.user);
    const [ username, setUsername ] = useState("");
    const [ firstName, setFirstname ] = useState("");
    const [ lastName, setLastname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();

    if (session) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(password, confirmPassword);
        if (password === confirmPassword) {
            setErrors({});
            const payload = {
                username,
                firstName,
                lastName,
                email,
                password
            };
            let user = await dispatch(signup(payload));

            // if (user.id) history.push('/');
            if (user.id) closeModal();
            else {
                const { errors } = await user.json();
                console.log(errors)
                setErrors(errors);
            }
        } else {
            setErrors({
                confirmPassword: "Confirm Password field must be the same as the Password field"
            });
        }
    };

    return (
        <div className="signup">
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </label>
                {errors.username && <div className="errors">{errors.username}</div>}
                <label>
                    First Name
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    />
                </label>
                {errors.firstName && <div className="errors">{errors.firstName}</div>}
                <label>
                    Last Name
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    />
                </label>
                {errors.lastName && <div className="errors">{errors.lastName}</div>}
                <label>
                    Email
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                {errors.email &&<div className="errors">{errors.email}</div>}
                <label>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                {errors.password && <div className="errors">{errors.password}</div>}
                <label>
                    Confirm Password
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </label>
                {errors.confirmPassword && <div className="errors">{errors.confirmPassword}</div>}
                <button className="form__button" type="submit" disabled={username.length < 4 || password.length < 6}>Sign Up</button>
            </form>
        </div>

    );
};

export default SignUpFormModal;
