import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteSpotReview } from '../../store/spots';

const DeleteReviewModal = ({ review, spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteSpotReview(review.id, spot.id));
        closeModal();
    }

    return (
        <div className="delete-spot">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button className="delete-spot__yes" onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className="delete-spot__no" onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
};

export default DeleteReviewModal;
