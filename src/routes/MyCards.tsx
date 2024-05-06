import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinners from '../components/Spinners';
import FavoriteButton from '../components/FavoriteButton';
import { AuthContext } from '../contexts/AuthContext';
import './Cards.scss';
import { FiEdit2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

const MyCards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;  // Exit early if no token
        }

        // API Call
        setLoading(true);
        axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', {
            headers: { 'x-auth-token': token }
        })
            .then(response => {
                setCards(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.toString());
                setLoading(false);
            });
    }, [token]);  // Depend on token to re-run effect

    const deleteCard = (cardId: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: { 'x-auth-token': token }
            })
                .then(() => {
                    // Remove card from state
                    setCards(cards.filter(card => card._id !== cardId));
                })
                .catch(err => {
                    console.error("Error deleting card:", err);
                });
        }
    };


    // Function to handle adding/removing favorites
    const addToFavorites = (cardId) => {
        const newFavorites = favorites.includes(cardId)
            ? favorites.filter(id => id !== cardId)  // Remove from favorites
            : [...favorites, cardId];  // Add to favorites
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    if (!token) return <p>Please log in to view your cards.</p>;
    if (loading) return <Spinners />;
    if (error) return <div>Error loading your cards: {error}</div>;

    return (
        <div className="cards-container dark:bg-gray-700">
            {cards.map((card) => (
                <div key={card._id} className="card dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
                    <Link to={`/update/${card._id}`} style={{ textAlign: "right", color: "#007bff"}}><FiEdit2 /></Link>
                    <FaTrash onClick={() => deleteCard(card._id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} /> {/* Add delete icon */}
                    <Link to={`/cards/${card._id}`} className="card-link">
                        <FavoriteButton
                            cardId={card._id}
                            isFavorite={favorites.includes(card._id)}
                            onToggleFavorite={addToFavorites}  // Properly pass the function
                        />
                        <h2 className="card-title">{card.title}</h2>
                        <hr />
                        <p className="card-subtitle">{card.subtitle}</p>
                        <img src={card.image.url} alt={card.image.alt} className="card-image" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MyCards;
