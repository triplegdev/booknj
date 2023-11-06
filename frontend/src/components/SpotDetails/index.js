import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import ReviewStar from "../ReviewStar";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots[id]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSpotDetails(id)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, id]);

    const formatAvgRating= (rating) => {
        if (rating % 1 === 0) {
            return rating.toFixed(1);
        } else if (rating % 0.1 === 0) {
            return rating.toString();
        } else {
            return rating.toFixed(2);
        }
    };

    return (
       <>
       { isLoaded &&
            <div className="spot-details__details-reviews">
                <div className="spot-details">
                    <div className="spot-details__name-location">
                        <h1>{spot.name}</h1>
                        {`${spot.city}, ${spot.state}, ${spot.country}`}
                    </div>
                    <div className="spot-details__images">
                        {/* {spot.SpotImages.map(img => (
                            <li>{img.url}</li>
                        ))} */}
                        <div id="big-picture" />
                        <div id="picture-group">
                            <div id="top-left" className="picture-single" />
                            <div id="top-right" className="picture-single" />
                            <div id="bottom-left" className="picture-single" />
                            <div id="bottom-right" className="picture-single" />
                        </div>
                    </div>
                    <div className="spot-details__details-reservation">
                        <div className="spot-details__details">
                            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                            <p>{spot.description}</p>
                        </div>
                        <div className="spot-details__reservation">
                            <div className="reservation__price-rating-review">
                                <div className="reservation__price"><span>{`$${spot.price}`}</span>night</div>
                                <div className="reservation__rating-review">
                                    { spot.avgRating ?
                                    <>
                                    <div className="reservation__rating">
                                        <ReviewStar />
                                        <span>{`${formatAvgRating(spot.avgRating)} ·`}</span>
                                    </div>
                                    <div className="reservation__reviews">
                                        {`${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`}
                                    </div>
                                    </>
                                    :
                                    <div className="reservation__rating">
                                        <ReviewStar />
                                        <span>New</span>
                                    </div>
                                    }
                                </div>
                            </div>
                            <button>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
        }
       </>
    )
};

export default SpotDetails;
