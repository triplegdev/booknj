import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SpotForm from '../SpotForm';
import { editSpot, getSpotDetails } from '../../store/spots';
import "../CreateSpot/CreateSpot.css";

const EditSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots[id]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSpotDetails(id)).then(() => {
            setIsLoaded(true);
        })
    }, [dispatch, id])

    if (!session) return <Redirect to="/" />;

    return (
        <>
        { isLoaded &&
            <div className="new-spot">
                <h1>Update a new Spot</h1>
                <SpotForm
                    action={editSpot}
                    type="edit"
                    spot={spot}
                />
            </div>
        }
        </>
    );
};

export default EditSpot;
