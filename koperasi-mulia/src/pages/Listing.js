import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import Supabase from '../components/Supabase';

function Listing() {
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data, error } = await Supabase
                    .from('Items') // Replace with your table name
                    .select('*'); // Selects all columns and rows

                if (error) throw error;

                setItems(data);
                initializeQuantities(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const initializeQuantities = (data) => {
        const initialQuantities = data.reduce((acc, item) => {
            acc[item.id] = { S: 0, M: 0, L: 0, XL: 0, XL3: 0, XL5: 0 };
            return acc;
        }, {});
        setQuantities(initialQuantities);
    };

    const updateQuantity = (itemId, size, value) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], [size]: value }
        }));
    };

    const handleCart = () => {
        console.log(quantities)
        const orderedItems = items.map(item => {
            const itemQuantities = Object.entries(quantities[item.id])
                .filter(([size, qty]) => qty > 0)
                .reduce((acc, [size, qty]) => ({ ...acc, [size]: qty }), {});

            return {
                ...item,
                qty: itemQuantities
            };
        });
        console.log(orderedItems);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {items.map((item) => (
                <ItemCard
                    key={item.article}
                    article={item.article}
                    qty={quantities[item.id]}
                    price={item.price}
                    updateQuantity={(size, value) => updateQuantity(item.id, size, value)}
                />
            ))}
            <button
                onClick={handleCart}
                className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded"
            >
                Check Cart
            </button>
        </div>
    );
}

export default Listing;
