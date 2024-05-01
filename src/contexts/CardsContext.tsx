import React, { createContext, useContext, useState } from 'react';
import { CardData } from '../@types/CardData';

interface CardContextType {
    cards: CardData[];
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
    const value = useContext(CardContext);
    if (value === undefined) {
        throw new Error('Cant use outside of context')  
    }
    return value;
}

export const CardProvider = ({ children }) => {
    const [cards, setCards] = useState([]);

    return (
        <CardContext.Provider value={{ cards, setCards }}>
            {children}
        </CardContext.Provider>
    );
};
