import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetail.css'

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch('https://powerful-savannah-96414.herokuapp.com/product/' +productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])

    return (
        <div>
            <h2>Product detail is here</h2>
            <Product showAddToCart={false} product ={product}></Product>
        </div>
    );
};

export default ProductDetail;