import { useState } from 'react';

const StarRating = ({ rating, onChange }) => {
    const [activeRating, setActiveRating] = useState(rating);
    const stars = [];

    const createRatingElement = (i) => {
        const starFill = i+1 <= activeRating ? "filled" : "empty";

        return (
          <div key={i} className={`stars ${starFill}`} onMouseEnter={() => setActiveRating(i+1)} onMouseLeave={() => setActiveRating(rating)} onClick={() => onChange(i+1)}>
              <i className="fa fa-star fa-2xl"></i>
          </div>
        )
      }

    for (let i = 0; i < 5; i++) {
        stars.push(createRatingElement(i));
    }

    return (
        <div className="stars__input">
            {stars}
        </div>
    );
}

export default StarRating;
