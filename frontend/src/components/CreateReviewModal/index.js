import { useModal } from '../../context/Modal';
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import StarRating from './StarRating';
import { postReview } from '../../store/spots';
import "./CreateReview.css";

const CreateReviewModal = ({ spot }) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { closeModal } = useModal();
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({})

    const onChange = (number) => {
        // const number = e.target.value;
        setRating(parseInt(number));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { review: reviewText, stars: parseInt(rating) };
        let review = await dispatch(postReview(payload, spot.id));

        if (review.id) closeModal();
        else {
            console.log(review);
            const { errors } = await review.json();
            setErrors(errors);
        }
    };

    return (
        <div className="review__form">
            <h1>How was your stay?</h1>
            <form className="form" onSubmit={handleSubmit}>
                {errors.review && <div className="errors">{errors.review}</div>}
                {errors.stars && <div className="errors">{errors.stars}</div>}
                <textarea
                    id="review"
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="12"
                    placeholder="Leave your review here..."
                    required
                />
                <div className="review__stars">
                    <StarRating
                    onChange={onChange}
                    rating={rating}
                    />
                    Stars
                </div>
                <button className="form__button" disabled={!rating || reviewText.length < 10}>Submit Your Review</button>
            </form>
        </div>
    );
};

export default CreateReviewModal;
