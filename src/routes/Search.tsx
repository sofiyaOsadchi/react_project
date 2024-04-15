import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardType } from "../@types/types";
import "./Search.scss"
import { useCards } from "../hooks/useCards";
import { useCardContext } from "../contexts/CardsContext";

const Item = ({ text, collapsed, id, callback }) => {
    if (collapsed) {
        return (
            <button
                onClick={() => {
                    callback(id);
                }}
            >
                Click to toggle
            </button>
        );
    }

    return <div>{text}</div>;
};

const Search = () => {
    const { cards, setCards } = useCardContext();
    const api = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;
    const [allCards, setAllCards] = useState<CardType[]>([]);
    const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(api).then((res) => setAllCards(res.data));
    }, []);

    useEffect(() => {
        const f = allCards.filter((c) => c.title.includes(search));
        setCards(f); // Set the filtered cards in the context
    }, [search, allCards]);

    return (
        <Stack className="search-container">
            <TextField
                className="search-input dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                    setSearch(e.currentTarget.value);
                }}
                variant="outlined"
                label="Search"
                required
            />
            {filteredCards.map((c) => (
                <div key={c._id} className="card-container">
                    <div className="card-title">{c.title}</div>
                </div>
            ))}
        </Stack>

    );
};

export default Search;