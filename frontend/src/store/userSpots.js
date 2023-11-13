import { csrfFetch } from "./csrf";

const GET_CURRENT_SPOTS = 'userSpots/GET_CURRENT_SPOTS';
const DELETE_CURRENT_SPOT = 'userSpots/DELETE_CURRENT_SPOT';

export const currentSpots = (spots) => ({
    type: GET_CURRENT_SPOTS,
    spots: spots.Spots
});

export const removeSpot = (spotId) => ({
    type: DELETE_CURRENT_SPOT,
    spotId
});

export const getCurrentSpots = () => async dispatch => {
    try {
        const res = await csrfFetch('/api/spots/current');
        const spots = await res.json();
        dispatch(currentSpots(spots));
        return spots;
    } catch (err) {
        return err;
    }
};

export const deleteCurrentSpot = (id) => async dispatch => {
    const options = { method: 'DELETE' };

    try {
        const res = await csrfFetch(`/api/spots/${id}`, options);
        const spot = await res.json();
        dispatch(removeSpot(id));
        return spot;
    } catch (err) {
        return err;
    }
};


const userSpotsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_CURRENT_SPOTS: {
            const spots = action.spots.reduce((obj, spot) => {
                obj[spot.id] = spot;
                return obj;
            }, {});
            return { ...spots };
        }
        case DELETE_CURRENT_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        }
        default: {
            return state;
        }
    };
};

export default userSpotsReducer;
