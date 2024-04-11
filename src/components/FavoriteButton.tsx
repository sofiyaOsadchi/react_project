import { FaHeart, FaRegHeart } from "react-icons/fa";

type FavoriteButtonProps = {
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

export default FavoriteButton;
