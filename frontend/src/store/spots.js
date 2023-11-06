import { csrfFetch } from "./csrf";

const GET_SPOTS = 'session/GET_SPOTS';

export const listSpots = (spots) => ({
    type: GET_SPOTS,
    spots: spots.Spots
});

export const getSpots = () => async dispatch => {
    try {
        const res = await csrfFetch('/api/spots');
        const spots = await res.json();
        console.log(spots);
        dispatch(listSpots(spots));
        return spots;
    } catch (err) {
        return err;
    }
};

const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_SPOTS: {
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

export default spotsReducer;
