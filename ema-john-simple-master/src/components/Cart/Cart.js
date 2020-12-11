import React, { useContext } from 'react';


const Cart = (props) => {
    const cart= props.cart;
    let total= 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping =0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 0){
        shipping=5.99;
    }
    else if (total > 15){
        shipping= 3.99
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = (total).toFixed(2)
    
    return (
        <div>
            <h3>Order Summery</h3>
            <p>Items Ordered:{cart.length}</p>
            <p>Product Price:{formatNumber}</p>
            <p>Shipping:{shipping}</p>
            <p>Tax + Vat:{tax}</p>
            <p>Total Price:{grandTotal}</p>
            <br/>
            {props.children}
            <p>{}</p>
        </div>
    );
};

export default Cart;