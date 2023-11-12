import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOTS_DETAILS';
const GET_SPOT_REVIEWS = 'spots/GET_SPOTS_REVIEWS';
// const POST_SPOT = 'spots/POST_SPOT';
// const POST_IMAGE = 'spots/POST_IMAGE';
const POST_REVIEW = 'spots/POST_REVIEW';

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

export const createReview = (review, spotId) => ({
    type: POST_REVIEW,
    review,
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
        return spot;
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

export const postReview = (review, spotId) => async dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(review)
    }
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, options);
        const review = await res.json();
        await dispatch(createReview(review, spotId));
        await dispatch(getSpotDetails(spotId));
        return review;
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
        }
        // case POST_SPOT: {
        //     return { ...state, [action.spot.id]: action.spot }
        // }
        case POST_REVIEW: {
            return {
                ...state,
                [action.spotId]: {
                    ...state[action.spotId],
                    Reviews: {
                        ...state[action.spotId].Reviews,
                        [action.review.id]: action.review
                    }
                }
            }
        }
        default: {
            return state;
        }
    };
};

export default spotsReducer;
