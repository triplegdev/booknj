import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReviewStar from "../ReviewStar";
import formatAvgRating from "../../util/util";
import { getSpotReviews } from "../../store/spots";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";
import './SpotReviews.css'

const SpotReviews = ({ spot }) => {
   const dispatch = useDispatch();
   const user = useSelector(state => state.session.user);
   const reviews = useSelector(state => state.spots[spot.id].Reviews);
   const [isLoaded, setIsLoaded] = useState(false);

   const canPostReview = isLoaded && user && (user.id !== spot.ownerId) && !Object.values(reviews).find(review => user.id === review.userId);

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
            {canPostReview &&
            <div>
               <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={<CreateReviewModal spot={spot}/>}
               />
               { !spot.avgRating && <p>Be the first to post a review!</p>}
            </div>
            }
            <div className="reviews__list">
                  {Object.values(reviews).map(review =>(
                     <ul key={review.id}>
                        <li><strong>{(user && review.userId === user.id) ? user.firstName : review.User.firstName}</strong></li>
                        <li id="review-date">{`${getDate(review.createdAt)}`}</li>
                        <li>{review.review}</li>
                        {(user && user.id === review.userId) &&
                           <OpenModalButton
                              buttonText="Delete"
                              modalComponent={<DeleteReviewModal review={review} spot={spot}/>}
                           />
                        }
                     </ul>
                  ))}
            </div>
         </div>
      }
      </>
   );
};

export default SpotReviews;
