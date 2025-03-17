import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (artworkId: number) => {
        setFavorites(prev => [...prev, artworkId]);
    };

    const removeFavorite = (artworkId: number) => {
        setFavorites(prev => prev.filter(id => id !== artworkId));
    };

    const isFavorite = (artworkId: number) => {
        return favorites.includes(artworkId);
    };

    const toggleFavorite = (artworkId: number) => {
        if (isFavorite(artworkId)) {
            removeFavorite(artworkId);
        } else {
            addFavorite(artworkId);
        }
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
    };
}