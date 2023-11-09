import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSpot, postImages } from '../../store/spots';
import "./CreateSpot.css";

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);
    const [ country, setCountry ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ city, setCity] = useState("");
    const [ state, setState ] = useState("");
    const [ latitude, setLatitude ] = useState("");
    const [ longitude, setLongitude ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ previewImage, setPreviewImage ] = useState("");
    const [ image1, setImage1 ] = useState("");
    const [ image2, setImage2 ] = useState("");
    const [ image3, setImage3 ] = useState("");
    const [ image4, setImage4 ] = useState("");
    const [ errors, setErrors ] = useState({});

    if (!session) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = {
            country,
            address,
            city,
            state,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            description,
            name,
            price
        };
        console.log(payload)

        const images = [
            { url: previewImage, preview: true },
            { url: image1.trim() || null, preview: false },
            { url: image2.trim() || null, preview: false },
            { url: image3.trim() || null, preview: false },
            { url: image4.trim() || null, preview: false }
        ]

        let spot = await dispatch(postSpot(payload));
        let imgArr;
        if (spot.id) {
            imgArr = await dispatch(postImages(images, spot.id));
        }

        if (spot.id && imgArr.length) {
            console.log('success');
            // history.push(`/spots/${spot.id}`);
        }
        else {
            const { errors } = await spot.json();
            setErrors(errors);
        }
    };

    return (
        <div className="new-spot">
            <h1>Creat a new Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation</p>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="country">
                    Country
                    <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    />
                </label>
                {errors.country && <div className="errors">{errors.country}</div>}
                <label htmlFor="address">
                    Street Adress
                    <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </label>
                {errors.address && <div className="errors">{errors.address}</div>}
                <label htmlFor="city">
                    City
                    <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                </label>
                {errors.city && <div className="errors">{errors.city}</div>}
                <label htmlFor="state">
                    State
                    <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                </label>
                {errors.state &&<div className="errors">{errors.state}</div>}
                <label htmlFor="latitude">
                    Latitude
                    <input
                    id="latitude"
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    />
                </label>
                {errors.lat && <div className="errors">{errors.lat}</div>}
                <label htmlFor="longitude">
                    Longitude
                    <input
                    id="longitude"
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                    />
                </label>
                {errors.lng && <div className="errors">{errors.lng}</div>}
                <label htmlFor="description">
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of you space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="10"
                    required
                    />
                </label>
                {errors.description && <div className="errors">{errors.description}</div>}
                <label htmlFor="name">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </label>
                {errors.name && <div className="errors">{errors.name}</div>}
                <label htmlFor="price">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    $<input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                </label>
                {errors.price && <div className="errors">{errors.price}</div>}
                <label htmlFor="preview">
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                    id="preview"
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder=" Preview Image URL"
                    required
                    />
                </label>
                {errors.preview && <div className="errors">{errors.preview}</div>}<input
                    type="text"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    placeholder=" Image URL"
                />
                {errors.image1 && <div className="errors">{errors.image1}</div>}
                <input
                    type="text"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    placeholder=" Image URL"
                />
                {errors.image2 && <div className="errors">{errors.image2}</div>}
                <input
                    type="text"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    placeholder=" Image URL"
                />
                {errors.image3 && <div className="errors">{errors.image3}</div>}
                <input
                    type="text"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    placeholder=" Image URL"
                />
                {errors.image4 && <div className="errors">{errors.image4}</div>}
                <button className="form__button" type="submit">Create Spot</button>
            </form>
        </div>

    );
};

export default CreateSpot;
