import { useParams, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import ReviewStar from "../ReviewStar";
import SpotReviews from "../SpotReviews";
import formatAvgRating from "../../util/util";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots[id]);
    // const reviews = useSelector(state => state.spots[spot.id].Reviews);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSpotDetails(id)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, id]);

    if (isLoaded && !spot) return <Redirect to="/" />;


    const spotImages = isLoaded ? Object.values(spot.SpotImages) : [];
    const preview = isLoaded ? spotImages.find(image => image.preview === true) : null;
    const images = isLoaded ? spotImages.filter(image => image.preview === false) : null;


    const imageIds = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];


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
                        <div id="big-picture" style={{backgroundImage: "url(/images/blank.png)"}}>
                            <div className="spot-details__overlay">
                                {(preview && preview.url) || "no image"}
                            </div>
                        </div>
                        <div id="picture-group">
                            {images.map((image, i) => (
                                <div key={i} id={imageIds[i]} className="picture-single" style={{backgroundImage: "url(/images/blank.png)"}}>
                                    <div className="spot-details__overlay">
                                        {image.url || "no image"}
                                    </div>
                                </div>
                            ))}
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
                            <button onClick={() => alert('Feature Coming Soon.')}>Reserve</button>
                        </div>
                    </div>
                </div>
                <SpotReviews spot={spot}/>
            </div>
        }
       </>
    )
};

export default SpotDetails;
