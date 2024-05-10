import axios from 'axios';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext"; 

type FavoriteButtonProps = {
    cardId: string;
    isFavorite: boolean;
    onToggleFavorite: (cardId: string) => void; // Adjust this as per the new API call
    token: string; // Pass the authentication token
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cardId, isFavorite, onToggleFavorite, token }) => {
    const { isLoggedIn } = useAuth();
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
    if (!isLoggedIn) return null;
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
