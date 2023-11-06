import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import Tooltip from './Tooltip';
import "./SpotsList.css";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(getSpots());
    },[dispatch]);

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
        <div className="spots-grid">
            {Object.values(spots).map(spot => {
                return (
                    <Tooltip text={spot.name}>
                        <div className="spot">
                            <div className="spot__image-container">
                                <img className="spot__image" src="/images/blank.png" alt="" />
                                <div className="spot__overlay">
                                    {spot.previewImage || "no image"}
                                </div>
                            </div>
                            <div className="spot__info">
                                <div>{spot.city}, {spot.state}</div>
                                <div>{spot.avgRating ? formatAvgRating(spot.avgRating) : "New"}</div>
                            </div>
                            <div className="spot__price"><strong>${spot.price}</strong>night</div>
                        </div>
                    </Tooltip>
                )
            })}
        </div>
    );
};

export default SpotsList;