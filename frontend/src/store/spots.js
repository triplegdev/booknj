import { csrfFetch } from "./csrf";

const GET_SPOTS = 'session/GET_SPOTS';
const GET_SPOT_DETAILS = 'session/GET_SPOTS_DETAILS';
const GET_SPOT_REVIEWS = 'session/GET_SPOTS_REVIEWS';

export const listSpots = (spots) => ({
    type: GET_SPOTS,
    spots: spots.Spots
});

export const spotDetails = (spot) => ({
    type: GET_SPOT_DETAILS,
    spot
});

export const spotReviews = (reviews, spotId) => ({
    type: GET_SPOT_REVIEWS,
    reviews,
    spotId
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

export const getSpotReviews = (id) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/spots/${id}/reviews`);
        const reviews = await res.json();
        // console.log(reviews);
        dispatch(spotReviews(reviews, id));
        return reviews;
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
        case GET_SPOT_REVIEWS: {
            // const reviews = action.reviews.reduce((obj, review) => {
            //     obj[review.id] = review;
            //     return obj;
            // }, {});
            // return {
            //     ...state,
            //     [action.spotId]: {
            //         ...state[action.spotId],
            //         Reviews: reviews
            //     }
            // };
            return {
                ...state,
                [action.spotId]: {
                    ...state[action.spotId],
                    ...action.reviews
                }
            }
        }
        default: {
            return state;
        }
    };
};

export default spotsReducer;
