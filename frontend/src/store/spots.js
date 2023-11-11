import { csrfFetch } from "./csrf";

const GET_SPOTS = 'session/GET_SPOTS';
const GET_SPOT_DETAILS = 'session/GET_SPOTS_DETAILS';
const GET_SPOT_REVIEWS = 'session/GET_SPOTS_REVIEWS';
// const POST_SPOT = 'session/POST_SPOT';
// const POST_IMAGE = 'session/POST_IMAGE';

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

// export const createSpot = (spot) => ({
//     type: POST_SPOT,
//     spot
// });

// export const uploadImage = (image) => ({
//     type: POST_IMAGE,
//     image
// });

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

export const postSpot = (spot) => async dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(spot)
    }
    try {
        const res = await csrfFetch('/api/spots', options);
        const spot = await res.json();
        console.log(spot);
        // dispatch(createSpot(reviews, id));
        // return spot;
    } catch (err) {
        return err;
    }
};

export const postImages = (images, spotId) => async dispatch => {
    const imgArr = [];
    for (const image of images) {
        if (image.url) {
            const options = {
                method: 'POST',
                body: JSON.stringify(image)
            }
            const url = `/api/spots/${spotId}/images`;
            try {
                const res = await csrfFetch(url, options);
                const image = await res.json();
                imgArr.push(image);
                console.log(image);
                // dispatch(uploadImage(image));
                // return image;
            } catch (err) {
                return err;
            }
        }
    }
    return imgArr;

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
        case GET_SPOT_DETAILS: {
            const spotImages = action.spot.SpotImages.reduce((obj, image) => {
                obj[image.id] = image;
                return obj;
            }, {});
             return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot,
                    SpotImages: spotImages
                }
            };
        }
        case GET_SPOT_REVIEWS: {
            const reviews = action.reviews.Reviews.reduce((obj, review) => {
                obj[review.id] = review;
                return obj;
            }, {});
            return {
                ...state,
                [action.spotId]: {
                    ...state[action.spotId],
                    Reviews: reviews
                }
            };
            // return {
            //     ...state,
            //     [action.spotId]: {
            //         ...state[action.spotId],
            //         ...action.reviews
            //     }
            // }
        }
        // case POST_SPOT: {
        //     return { ...state, [action.spot.id]: action.spot }
        // }
        default: {
            return state;
        }
    };
};

export default spotsReducer;
