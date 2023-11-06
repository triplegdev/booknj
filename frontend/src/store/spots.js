import { csrfFetch } from "./csrf";

const GET_SPOTS = 'session/GET_SPOTS';
const GET_SPOT_DETAILS = 'session/GET_SPOTS_DETAILS';

export const listSpots = (spots) => ({
    type: GET_SPOTS,
    spots: spots.Spots
});

export const spotDetails = (spot) => ({
    type: GET_SPOT_DETAILS,
    spot
});

export const getSpots = () => async dispatch => {
    try {
        const res = await csrfFetch('/api/spots');
        const spots = await res.json();
        dispatch(listSpots(spots));
        return spots;
    } catch (err) {
        return err;
    }
};

export const getSpotDetails = (id) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/spots/${id}`);
        const spot = await res.json();
        dispatch(spotDetails(spot));
        return spot;
    } catch (err) {
        return err;
    }
}

const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const spots = action.spots.reduce((obj, spot) => {
                obj[spot.id] = spot;
                return obj;
            }, {});
            return { ...spots };
        }
        case GET_SPOT_DETAILS: {
             return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            };
        }
        default: {
            return state;
        }
    };
};

export default spotsReducer;
