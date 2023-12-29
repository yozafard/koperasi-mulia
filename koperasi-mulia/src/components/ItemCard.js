import React, { useState } from 'react';

const ItemCard = ({ article, price }) => {
    const initialQtyState = { S: 0, M: 0, L: 0, XL: 0, XL3: 0, XL5: 0 };
    const [qty, setQty] = useState(initialQtyState);

    // Function to update quantity
    const updateQty = (size, value) => {
        setQty({ ...qty, [size]: Math.max(0, value) });
        console.log(qty) // Prevents negative values
    };

    // Function to handle input change
    const handleInputChange = (size, event) => {
        const value = parseInt(event.target.value, 10);
        updateQty(size, isNaN(value) ? 0 : value);
    };

    // Function to render quantity inputs
    const renderQuantities = () => {
        return Object.entries(qty).map(([size, count]) => (
            <div key={size} className="qty-input flex items-center space-x-2">
                <button onClick={() => updateQty(size, count - 1)} className='px-2 py-1 bg-blue-500 text-white rounded'>-</button>
                <input type="number" value={count} onChange={(e) => handleInputChange(size, e)} className='w-12 px-2 py-1 border rounded'/>
                <button onClick={() => updateQty(size, count + 1)} className='px-2 py-1 bg-blue-500 text-white rounded'>+</button>
                <span> {size} </span>
            </div>
        ));
    };

    return (
        <div className="flex content-center justify-between p-6 my-6 border rounded-lg shadow-md w-100">
            <div className="items-center w-48 my-auto text-left">
                <h3 className="mb-2 text-gray-500 font-bold">
                    {article}
                </h3>
                <h3 className="mb-2 text-xl font-bold">
                    Rp {price}
                </h3>
                <div className="mb-2 text-xl font-bold">
                    {renderQuantities()}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
