const formatAvgRating= (rating) => {
    const floatNumber = parseFloat(rating);
    //add two decimal places and remove trailing zeroes
    const formattedNumber = floatNumber.toFixed(2).replace(/\.?0+$/, '');
    //add .0 for numbers without decimal places
    return floatNumber % 1 === 0 ? formattedNumber + '.0' : formattedNumber;
};

export default formatAvgRating;
