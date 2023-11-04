import { Redirect, useHistory } from 'react-router-dom';
import "./LoginForm.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';

const LoginFormPage = () => {
    const history = useHistory();
    const session = useSelector(state => state.session.user);
    const [ credential, setCredential ] = useState('Demo-lition');
    const [ password, setPassword ] = useState('password');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();

    if (session) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = { credential, password };
        let user = await dispatch(login(payload));

        if (user.id) history.push('/');
        else {
            const { errors } = await user.json();
            setErrors(errors);
        }
    };

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                {errors.credential && <div className="errors">{errors.credential}</div>}
                <label>
                    Username or Email
                    <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    />
                </label>
                {errors.password && <div className="errors">{errors.password}</div>}
                <label>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="form__button" type="submit">Login</button>
            </form>
        </div>

    );
};

export default LoginFormPage;
