import React, { useState, useEffect, useContext } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';
import { UserContext } from '../../App';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(keys => {
            const product = fakeData.find(pd =>pd.key ===keys)
            product.quantity = savedCart[keys];
            return product;
        })
        setCart(cartProducts);
    }, []);
    const orderPlacedStyle={
        margin: '0% 20%',
        
    }
    let thankYou;  
    if (orderPlaced) {
        thankYou = <img style={orderPlacedStyle} src={happyImage} alt=""/>
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem 
                    key={pd.key}
                    removeProduct ={removeProduct}
                    product={pd}>

                    </ReviewItem>)
                }
                {thankYou}
                {!cart.length && <h1>You did not add any product. Please <a href ='/shop'>keep shopping</a></h1>}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <Link to ='shipment'>
                   { loggedInUser.email ?
                        <button className='main-button' >Proceed Checkout</button>
                        :<button className='main-button' >Login to Proceed</button>
                   }
                    </Link>
                </Cart>    
            </div>
           
        </div>
    );
};

export default Review;