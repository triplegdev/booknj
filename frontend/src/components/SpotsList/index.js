import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import Tooltip from './Tooltip';
import ReviewStar from '../ReviewStar';
import LoadingFlash from '../LoadingFlash';
import formatAvgRating from "../../util/formatAvgRating";
import checkImages from "../../util/checkImages";
import "./SpotsList.css";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    const [invalidUrls, setInvalidUrls] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);


    useEffect(() => {
        dispatch(getSpots()).then(() => {
            setIsLoaded(true);
        });

    }, [dispatch]);

    useEffect(() => {
        if (isLoaded) {
            checkImages(Object.values(spots)).then(invalidUrls => {
                setInvalidUrls(invalidUrls);
                setImagesLoaded(true);
            });
        }
    }, [isLoaded, spots]);

    return (
        <div className="spots-grid">
        {isLoaded && imagesLoaded ?
            Object.values(spots).map(spot => {
                const imgInvalid = invalidUrls.includes(spot.previewImage);
                    return (
                            <Tooltip key={spot.id} text={spot.name}>
                                <Link to={`/spots/${spot.id}`}>
                                    <div className="spot">
                                        <div className="spot__image-container">
                                            <img className="spot__image" src={imgInvalid ? "/images/demo-house_dark.jpg" : spot.previewImage} alt="" />
                                            {imgInvalid &&
                                                <div className="spot__overlay">
                                                    {spot.previewImage}
                                                </div>
                                            }
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
            })
            :
            new Array(8).fill(null).map((slot, i) => (
                <LoadingFlash key={i}/>
            ))
        }
        </div>
    );
};

export default SpotsList;
