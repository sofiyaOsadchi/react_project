import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardType } from "../@types/types";
import "./Search.scss"
import { useCards } from "../hooks/useCards";

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
    const { setCards } = useCards();
    const api = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;
    const [allCards, setAllCards] = useState<CardType[]>([]);
    const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(api).then((res) => setAllCards(res.data));
    }, []);

   useEffect(() => {
        // Filter cards based on the search term
        const f = allCards.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())); // Added toLowerCase() for case-insensitive search
        setFilteredCards(f);
        setCards(f);
    }, [search, allCards]); 

    return (
        <Stack className="search-container">
            <TextField
                className="search-input"
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