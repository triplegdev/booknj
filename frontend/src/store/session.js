import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

export const setUser = (user) => ({
    type: SET_USER,
    user
});

export const removeUser = () => ({
    type: REMOVE_USER
});

export const login = (user) => async dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(user)
    }

    try {
        const res = await csrfFetch('/api/session', options);
        const data = await res.json();
        dispatch(setUser(data.user));
        return data.user;
    } catch (err) {
        return err;
    }
};

export const logout = () => async dispatch => {
    const options = {
        method: 'DELETE'
    }

    const res = await csrfFetch('/api/session', options);

    if (res.ok) {
        const user = await res.json();
        dispatch(removeUser(user));
        return user;
    }
    return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            return { ...state, user: action.user};
        }
        case REMOVE_USER: {
            return { ...state, user: null};
        }
        default: return state
    }
};

export default sessionReducer;
