import ReviewStar from "../ReviewStar";
import formatAvgRating from "../../util/formatAvgRating";

const SpotReserve = ({ spot }) => {
    return (
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
    );
}

export default SpotReserve;
