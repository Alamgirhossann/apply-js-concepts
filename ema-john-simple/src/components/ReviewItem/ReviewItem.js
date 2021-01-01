import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, key, price} = props.product;
    const ReviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    }
    return (
        <div style={ReviewItemStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br/>
            <button onClick ={()=> props.removeProduct(key)} className='main-button'>Remove Item</button>
        </div>
    );
};

export default ReviewItem;
