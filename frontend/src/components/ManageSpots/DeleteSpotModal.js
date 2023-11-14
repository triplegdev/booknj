import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteCurrentSpot } from '../../store/userSpots';

const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteCurrentSpot(spot.id));
        closeModal();
    }

    return (
        <div className="delete-spot">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button className="delete-spot__yes" onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className="delete-spot__no" onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
};

export default DeleteSpotModal;
