import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReviewStar from "../ReviewStar";
import formatAvgRating from "../../util/util";
import { getSpotReviews } from "../../store/spots";
import './SpotReviews.css'

const SpotReviews = ({ spot }) => {
   const dispatch = useDispatch();
   const reviews = useSelector(state => state.spots[spot.id].Reviews);
   const [isLoaded, setIsLoaded] = useState(false);

   const getDate = (dateString) => {
      const date = new Date(dateString);

      const months = [
         "January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
       ];

       const month = months[date.getMonth()];
       const year = date.getFullYear();

       return month + ' ' + year;
   }

    useEffect(() => {
        dispatch(getSpotReviews(spot.id)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, spot.id]);

   return (
      <>
      { isLoaded &&
         <div className="spots-details__reviews">
               <div className="reviews__rating">
                  { spot.avgRating ?
                  <>
                  <div className="rating">
                     <span id="review-star"><ReviewStar /></span>
                     <span>{`${formatAvgRating(spot.avgRating)} ·`}</span>
                  </div>
                  <div className="num-reviews">
                     {`${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`}
                  </div>
                  </>
                  :
                  <div className="rating">
                     <span id="review-star"><ReviewStar /></span>
                     <span>New</span>
                  </div>
                  }
            </div>
            <div className="reviews__list">
                  {Object.values(reviews).map(review =>(
                     <ul>
                        <li><strong>{review.User.firstName}</strong></li>
                        <li id="review-date">{`${getDate(review.createdAt)}`}</li>
                        <li>{review.review}</li>
                     </ul>
                  ))}
            </div>
         </div>
      }
      </>
   );
};

export default SpotReviews;
