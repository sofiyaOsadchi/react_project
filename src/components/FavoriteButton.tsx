import axios from 'axios';
import { FaHeart, FaRegHeart } from "react-icons/fa";

/* type FavoriteButtonProps = {
    cardId: string;
    isFavorite: boolean;
    onToggleFavorite: (cardId: string) => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cardId, isFavorite, onToggleFavorite }) => {
    return (
        <button
            className="add-to-favorite-button"
            onClick={(e) => {
                e.preventDefault(); // Prevents the link from being followed
                e.stopPropagation(); // Prevents the button's click event from bubbling up
                onToggleFavorite(cardId);
            }}
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
};

export default FavoriteButton; */



type FavoriteButtonProps = {
    cardId: string;
    isFavorite: boolean;
    onToggleFavorite: (cardId: string) => void; // Adjust this as per the new API call
    token: string; // Pass the authentication token
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cardId, isFavorite, onToggleFavorite, token }) => {
    const toggleFavorite = () => {
        const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`;

        // Make a PATCH request to toggle favorite status on the server
        axios.patch(url, {}, {
            headers: { 'x-auth-token': token }
        })
            .then(() => {
                onToggleFavorite(cardId); // Update local state after successful server call
            })
            .catch(err => {
                console.error('Error toggling favorite:', err);
            });
    };

    return (
        <button
            className="add-to-favorite-button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite();
            }}
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
};

export default FavoriteButton;
