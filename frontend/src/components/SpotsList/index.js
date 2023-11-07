import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import Tooltip from './Tooltip';
import ReviewStar from '../ReviewStar';
import formatAvgRating from "../../util/util";
import "./SpotsList.css";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(getSpots());
    },[dispatch]);

    return (
        <div className="spots-grid">
            {Object.values(spots).map(spot => {
                return (
                    <Tooltip key={spot.id} text={spot.name}>
                        <Link to={`/spots/${spot.id}`}>
                            <div className="spot">
                                <div className="spot__image-container">
                                    <img className="spot__image" src="/images/blank.png" alt="" />
                                    <div className="spot__overlay">
                                        {spot.previewImage || "no image"}
                                    </div>
                                </div>
                                <div className="spot__info">
                                    <div>{spot.city}, {spot.state}</div>
                                    <div className="spot__rating"><ReviewStar /><span>{spot.avgRating ? formatAvgRating(spot.avgRating) : "New"}</span></div>
                                </div>
                                <div className="spot__price"><strong>${spot.price}</strong>night</div>
                            </div>
                        </Link>
                    </Tooltip>
                )
            })}
        </div>
    );
};

export default SpotsList;
