import { Redirect, useHistory } from 'react-router-dom';
import "./SignUpForm.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session';

const SignUpFormPage = () => {
    const history = useHistory();
    const session = useSelector(state => state.session.user);
    const [ username, setUsername ] = useState('username');
    const [ firstName, setFirstname ] = useState('firstname');
    const [ lastName, setLastname ] = useState('lastname');
    const [ email, setEmail ] = useState('email');
    const [ password, setPassword ] = useState('password');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();

    if (session) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = {
            username,
            firstName,
            lastName,
            email,
            password
        };
        let user = await dispatch(signup(payload));

        if (user.id) history.push('/');
        else {
            const { errors } = await user.json();
            setErrors(errors);
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                {errors.username && <div className="errors">{errors.username}</div>}
                <label>
                    Username:
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                {errors.firstName && <div className="errors">{errors.firstName}</div>}
                <label>
                    First Name:
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    />
                </label>
                {errors.lastName && <div className="errors">{errors.lastName}</div>}
                <label>
                    Last Name:
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    />
                </label>
                {errors.email &&<div className="errors">{errors.email}</div>}
                <label>
                    Email:
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                {errors.password && <div className="errors">{errors.password}</div>}
                <label>
                    Password:
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>

    );
};

export default SignUpFormPage;
