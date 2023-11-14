import { Link, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSpots } from '../../store/userSpots';
import OpenModalButton from "../OpenModalButton";
import ReviewStar from '../ReviewStar';
import formatAvgRating from "../../util/util";
import './ManageSpots.css';
import DeleteSpotModal from './DeleteSpotModal';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.userSpots);
    const session = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getCurrentSpots());
    },[dispatch]);

    if (!session) return <Redirect to="/" />;

    return (
        <div className="manage-spots">
            <h1>Manage Spots</h1>
            {!Object.values(spots).length && <Link to="/spots/new"><button className="manage-spots__create-spot">Create a New Spot</button></Link>}
            <div className="spots-grid">
            {Object.values(spots).map(spot => {
                return (
                    <div key={spot.id}>
                        <Link to={`/spots/${spot.id}`}>
                            <div className="spot">
                                <div className="spot__image-container">
                                    <img className="spot__image" src="/images/demo-house_dark.jpg" alt="" />
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
                        <div className="spots-grid__update-delete">
                            <Link to={`/spots/${spot.id}/edit`}><button>Update</button></Link>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteSpotModal spot={spot}/>}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
    )
};

export default ManageSpots;
