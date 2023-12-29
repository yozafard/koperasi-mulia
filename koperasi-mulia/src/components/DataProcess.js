import React from 'react';

function DataProcess(orderData) {
    return orderData.items.map(item => ({
        name: orderData.buyerName,
        item_name: item.itemName,
        qty_s: item.quantities.S,
        qty_m: item.quantities.M,
        // ... more sizes as per your table columns
    }));
}

export default DataProcess
