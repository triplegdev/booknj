import { csrfFetch } from "./csrf";

const GET_CURRENT_SPOTS = 'userSpots/GET_CURRENT_SPOTS';

export const currentSpots = (spots) => ({
    type: GET_CURRENT_SPOTS,
    spots: spots.Spots
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


const userSpotsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_CURRENT_SPOTS: {
            const spots = action.spots.reduce((obj, spot) => {
                obj[spot.id] = spot;
                return obj;
            }, {});
            return { ...spots };
        }
        default: {
            return state;
        }
    };
};

export default userSpotsReducer;
