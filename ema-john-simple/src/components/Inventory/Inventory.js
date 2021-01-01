import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () =>{
        fetch('https://powerful-savannah-96414.herokuapp.com/addProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fakeData)
        })
        .then(result => {
            console.log(result);
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text"/></p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity:</span><input type="text"/></p>
                <p><span>Product image</span><input type="file"/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
            
        </div>
    );
};

export default Inventory;