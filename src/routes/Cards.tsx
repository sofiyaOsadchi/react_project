import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
/* import { useCardContext } from "../contexts/CardsContext"; */
import "./Cards.scss";
import { useState, useEffect } from "react";
import FavoriteButton from "../components/FavoriteButton";
import { useCards } from "../hooks/useCards";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { CardType } from "../@types/types";
import { useSearch } from "../contexts/SearchContext";

/* const Cards = ({ favoritesOnly = false }) => {
  const { cards: contextCards } = useCardContext();
  const { loading, error } = useCards();
  const [favorites, setFavorites] = useState<string[]>([]);
  const { token } = useAuth();  */

const Cards = ({ favoritesOnly = false }) => {
  const [cards, setCards] = useState<CardType[]>([]); // Updated
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state

  const [favorites, setFavorites] = useState<string[]>([]);
  const { token } = useAuth();
  const { searchTerm } = useSearch();

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(currentFavorites);

    setLoading(true);
    axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
      headers: { 'x-auth-token': token }
    })
      .then((res) => {
        setCards(res.data);
      })
      .catch(() => setError("Error fetching cards"))
      .finally(() => setLoading(false));
  }, [token]);



  const addToFavorites = async (cardId: string) => {
    try {
      // Update the local favorites list
      const currentFavorites = [...favorites];
      if (currentFavorites.includes(cardId)) {
        const index = currentFavorites.indexOf(cardId);
        currentFavorites.splice(index, 1);
      } else {
        currentFavorites.push(cardId);
      }
      setFavorites(currentFavorites);
    } catch (e) {
      console.error("Failed to update favorite status:", e);
    }
  }

  /* const filteredCards = favoritesOnly
    ? contextCards.filter(card => favorites.includes(card._id))
    : contextCards; */

  const filteredCards = cards.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="cards-container dark:bg-gray-700">
      {loading && <Spinners />}
      {error && <div>{error}</div>}

      {filteredCards.map((c) => (
        <div key={c._id}>
          
          <Link to={`/cards/${c._id}`} className="card-link dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
            <FavoriteButton
              cardId={c._id}
              isFavorite={favorites.includes(c._id)}
              onToggleFavorite={addToFavorites} token={""}  />
            <h2 className="card-title">{c.title}</h2>
            <hr />
            <p className="card-subtitle">{c.subtitle}</p>
            <img src={c.image.url} alt={c.image.alt} className="card-image" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;