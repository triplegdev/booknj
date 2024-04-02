import { useParams, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import SpotReserve from "./SpotReserve";
import SpotReviews from "../SpotReviews";
import checkImages from "../../util/checkImages";
import Slider from 'react-slick';
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots[id]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [invalidUrls, setInvalidUrls] = useState([]);

    useEffect(() => {
        dispatch(getSpotDetails(id)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, id]);

    useEffect(() => {
        isLoaded && checkImages(Object.values(spot.SpotImages)).then(invalidUrls => {
            setInvalidUrls(invalidUrls);
        });
    }, [spot, isLoaded]);

    if (isLoaded && !spot) return <Redirect to="/" />;


    const spotImages = isLoaded ? Object.values(spot.SpotImages) : [];
    const preview = isLoaded ? spotImages.find(image => image.preview === true) : null;
    const images = isLoaded ? spotImages.filter(image => image.preview === false) : null;


    const imageIds = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return (
       <>
       { isLoaded &&
            <div className="spot-details__details-reviews">
                <div className="spot-details">
                    <div className="spot-details__name-location">
                        <h1>{spot.name}</h1>
                        {`${spot.city}, ${spot.state}, ${spot.country}`}
                    </div>
                    <div className="spot-details__images-container">
                        <div className="spot-details__images-slideshow">
                            <Slider {...settings}>
                                {spotImages.map((image, i) => {
                                    const imgInvalid = invalidUrls.includes(image.url);
                                    return (
                                    <div key={i} id={imageIds[i]} className="picture-full">
                                        <img src={`${invalidUrls.includes(image.url) ? '/images/demo-house_dark.jpg' : image.url})`} alt=""/>
                                        {imgInvalid &&
                                            <div className="spot-details__overlay">
                                                {image.url}
                                            </div>
                                        }
                                    </div>
                                    )
                                })}
                            </Slider>
                        </div>
                        <div className="spot-details__images">
                            <div id="big-picture" style={{backgroundImage: `url(${invalidUrls.includes(preview.url) ? '/images/demo-house_dark.jpg' : preview.url})`}}>
                            {invalidUrls.includes(preview.url) &&
                                <div className="spot-details__overlay">
                                    {preview && preview.url}
                                </div>
                            }
                            </div>
                            <div id="picture-group">
                                {images.map((image, i) => {
                                    const imgInvalid = invalidUrls.includes(image.url);
                                    return (
                                    <div key={i} id={imageIds[i]} className="picture-single" style={{backgroundImage: `url(${invalidUrls.includes(image.url) ? '/images/demo-house_dark.jpg' : image.url})`}}>
                                        {imgInvalid &&
                                            <div className="spot-details__overlay">
                                                {image.url}
                                            </div>
                                        }
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="spot-details__details-reservation">
                        <div className="spot-details__details">
                            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                            <p>{spot.description}</p>
                        </div>
                        <SpotReserve spot={spot}/>
                    </div>
                </div>
                <SpotReviews spot={spot}/>
            </div>
        }
       </>
    )
};

export default SpotDetails;
