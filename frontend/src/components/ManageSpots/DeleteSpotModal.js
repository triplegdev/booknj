import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';

const DeleteSpot = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {

    }

    return (
        <div className="delete-spot">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="delete-spot__yes">Yes (Delete Spot)</button>
            <button className="delete-spot__no">No (Keep Spot)</button>
        </div>
    );
};

export default DeleteSpot;
