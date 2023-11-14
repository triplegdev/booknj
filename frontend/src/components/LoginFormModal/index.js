import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { login } from '../../store/session';
import "./LoginForm.css";

const LoginFormModal = () => {
    // const history = useHistory();
    const session = useSelector(state => state.session.user);
    const [ credential, setCredential ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    if (session) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { credential, password };
        let user = await dispatch(login(payload));

        // if (user.id) history.push('/');
        if (user.id) closeModal();
        else {
            const { errors } = await user.json();
            setErrors(errors);
        }
    };

    const handleDemoLogin = async (e) => {
        setErrors({});
        const payload = { credential: 'Demo-lition', password: 'password' };
        let user = await dispatch(login(payload));

        if (user.id) closeModal();
        else {
            const { errors } = await user.json();
            setErrors(errors);
        }
    };

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                {errors.credential && <div className="errors">{errors.credential}</div>}
                <label htmlFor="username">
                    Username or Email
                    <input
                    id="username"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    />
                </label>
                {errors.password && <div className="errors">{errors.password}</div>}
                <label htmlFor="password">
                    Password
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                <button className="form__button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
            </form>
            <button className="form__button-demo" onClick={handleDemoLogin}>Log in as Demo User</button>
        </div>

    );
};

export default LoginFormModal;
