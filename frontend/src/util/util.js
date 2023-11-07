const formatAvgRating= (rating) => {
    if (rating % 1 === 0) {
        return rating.toFixed(1);
    } else if (rating % 0.1 === 0) {
        return rating.toString();
    } else {
        return rating.toFixed(2);
    }
};

export default formatAvgRating;
