import React from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
    const location = useLocation();
    const { orderedItems } = location.state || {};

    return (
        <div>
            <h1>Checkout</h1>
            {orderedItems && orderedItems.map((item, index) => (
                // Display ordered items
                <div key={index}>
                    <p>{item.article}</p>
                    <p>{JSON.stringify(item.qty)}</p>
                    <p>${item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Checkout;
