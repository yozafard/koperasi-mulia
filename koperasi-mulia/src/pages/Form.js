import React, { useState } from 'react';
import Supabase from '../components/Supabase';
import SuccessModal from '../components/Modal';
// import SpreadsheetProcess from '../components/DataProcess';

function OrderForm() {
    const [buyerName, setBuyerName] = useState('');
    const [items, setItems] = useState([
        { itemName: '', quantities: { S: 0, M: 0, L: 0, XL: 0, XL3: 0, XL5: 0 } }
    ]);
    const [department, setDepartment] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [paymentOption, setPaymentOption] = useState('potong_gaji');
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    function handleBuyerNameChange(event) {
        setBuyerName(event.target.value);
    }

    function handleDepartmentChange(event) {
        setDepartment(event.target.value);
    }
    
    function handleIdNumberChange(event) {
        setIdNumber(event.target.value);
    }
    
    function handlePaymentOptionChange(event) {
        setPaymentOption(event.target.value);
    }
    

    function handleItemNameChange(index, event) {
        const newItems = [...items];
        newItems[index].itemName = event.target.value;
        setItems(newItems);
    }

    function handleQuantityChange(index, size, qty) {
        const newItems = [...items];
        const newQty = Math.max(0, qty); // Ensure the quantity is not negative
        newItems[index].quantities[size] = newQty;
        setItems(newItems);
    }
    

    function addItem() {
        setItems([...items, { itemName: '', quantities: { S: 0, M: 0, L: 0, XL: 0, XL3: 0, XL5: 0 } }]);
    }

    function removeItem(index) {
        setItems(items.filter((_, i) => i !== index));
    }

    function renderItems() {
        return items.map((item, index) => (
            <div key={index} className="item mb-4 mt-2 border-solid border-2 rounded-lg p-3">
                <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleItemNameChange(index, e)}
                    placeholder="Nama Item"
                    className="mb-2"
                />
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(item.quantities).map(([size, qty]) => (
                        <div key={size} className="flex items-center">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(index, size, Math.max(0, qty - 1))}
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                -
                            </button>
                            <div className="flex flex-col items-center">
                                <label htmlFor={`size-${size}-${index}`} className="text-xs font-medium">
                                    {size}
                                </label>
                                <input
                                    type="number"
                                    id={`size-${size}-${index}`}
                                    value={qty}
                                    readOnly
                                    onChange={(e) => handleQuantityChange(index, size, e)}
                                    className="w-8 text-center"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(index, size, qty + 1)}
                                className="px-2 py-1 bg-green-500 text-white rounded"
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>

                <div className='mt-2 grid grid-cols-2 gap-6'>
                <button type="button" onClick={() => removeItem(index)} className="bg-red-500 text-white rounded p-1 text-s">Remove Item</button>
                <button type="button" onClick={addItem} className="bg-green-500 text-white rounded p-1 text-s">Add Item</button>
                </div>
            </div>
        ));
    }
    
    
    
    function formatDataForSupabase(orderData) {
        return orderData.items.map(item => ({
            name: orderData.buyerName,
            department: orderData.department,
            nik: orderData.idNumber,
            payment: orderData.paymentOption,
            item: item.itemName,
            qty_s: item.quantities.S,
            qty_m: item.quantities.M,
            qty_l: item.quantities.L,
            qty_xl: item.quantities.XL,
            qty_3xl: item.quantities.XL3,
            qty_5xl: item.quantities.XL5,


        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const orderData = {
            buyerName,
            items,
            department,
            idNumber,
            paymentOption
        };

        const formattedData = formatDataForSupabase(orderData);
    try {
        console.log(formattedData[0]);
        let { error } = await Supabase
            .from('Order')
            .insert(formattedData);
        
        if (error) throw error;
        // await SpreadsheetProcess(formattedData);
        setShowModal(true);
        } catch (error) {
            console.error('Error submitting order:', error.message);
        }
            console.log(orderData);
            // SpreadsheetProcess();
            // Handle form submission logic here
            setShowSuccessModal(true);

            // Optionally, reset form fields
            setBuyerName('');
            setDepartment('');
            setIdNumber('');
            setPaymentOption('transfer');
            setItems([{ itemName: '', quantities: { S: 0, M: 0, L: 0, XL: 0, XL3: 0, XL5: 0 } }]);

        }
    
    
    return (
        <form onSubmit={handleSubmit} className='p-4'>
            <input
                type="text"
                value={buyerName}
                onChange={handleBuyerNameChange}
                placeholder="Nama"
            />

            <input
                type="text"
                value={department}
                onChange={handleDepartmentChange}
                placeholder="Bagian"
            />
            <input
                type="text"
                value={idNumber}
                onChange={handleIdNumberChange}
                placeholder="NIK"
            />
            <div>
                <h1>Pembayaran:</h1>
                <label className='p-2 pl-0'>
                    <input
                        type="radio"
                        value="potong_gaji"
                        checked={paymentOption === 'potong_gaji'}
                        onChange={handlePaymentOptionChange}
                    />
                    Potongan Gaji
                </label>
                <label className='p-2'>
                    <input
                        type="radio"
                        value="transfer"
                        checked={paymentOption === 'transfer'}
                        onChange={handlePaymentOptionChange}
                    />
                    Transfer
                </label>
                <label className='p-2'>
                    <input
                        type="radio"
                        value="cash"
                        checked={paymentOption === 'cash'}
                        onChange={handlePaymentOptionChange}
                    />
                    Cash
                </label>
        </div>
            {renderItems()}
            <button type="submit" className='bg-blue-500 text-l font-bold text-white p-3 border-solid rounded-lg'>Submit Order</button>
            {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}

        </form>
    );
}

export default OrderForm;
