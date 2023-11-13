import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotForm from '../SpotForm';
import { postSpot } from '../../store/spots';
import "./CreateSpot.css";

const CreateSpot = () => {
    const session = useSelector(state => state.session.user);

    if (!session) return <Redirect to="/" />;

    return (
        <div className="new-spot">
            <h1>Create a new Spot</h1>
            <SpotForm
                action={postSpot}
                type="create"
            />
        </div>
    );
};

export default CreateSpot;
