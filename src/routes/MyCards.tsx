import React, { useEffect, useState, useContext, FC } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinners from '../components/Spinners';
import FavoriteButton from '../components/FavoriteButton';
import { AuthContext } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';
import { CardType } from "../@types/types";
import './Cards.scss';
import './MyCards.scss';
import {  FaEdit, FaTrash } from 'react-icons/fa';
import { Card } from '../@types/CardData';


const MyCards: FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    const token = authContext ? authContext.token : null;
    const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
    const { searchTerm } = useSearch();

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
    }, [token]);  

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

    const filteredCards = cards.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!token) return <p>Please log in to view your cards.</p>;
    if (loading) return <Spinners />;
    if (error) return <div>Error loading your cards: {error}</div>;

    // MyCards.tsx
    return (
        <div className="cards-container dark:bg-gray-700">
            {filteredCards.map((card) => ( // Change `cards` to `filteredCards`
                <div key={card._id} className="card dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
                    <div className="card-actions">
                        <Link to={`/update/${card._id}`} className="card-edit-icon">
                            <FaEdit />
                        </Link>
                        <FaTrash
                            onClick={() => deleteCard(card._id)}
                            className="card-delete-icon"
                        />
                    </div>
                    <Link to={`/cards/${card._id}`} className="card-link">
                        <FavoriteButton
                            cardId={card._id}
                            isFavorite={favorites.includes(card._id)}
                            onToggleFavorite={addToFavorites} token={''}                        />
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
