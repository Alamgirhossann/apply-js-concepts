import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';


const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [shippingData, setShippingData] = useState(null)

  const onSubmit = data => {
    setShippingData(data)
  }

  const handlePaymentSuccess = paymentId =>{
    const savedCart = getDatabaseCart();
    const productDetail = { 
      ...loggedInUser, 
      product: savedCart, 
      paymentId,
      shipment: shippingData, 
      orderTime: new Date() 
    }

    fetch('https://powerful-savannah-96414.herokuapp.com/addOrders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productDetail)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Order Placed Successfully')
        }
      })
  }

  return (

    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Name' />
          {errors.name && <span className='error'>Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Email' />
          {errors.email && <span className='error'>Email is required</span>}

          <input name="addressline1" ref={register({ required: true })} placeholder='Addressline1' />
          {errors.addressline1 && <span className='error'>Address is required</span>}

          <input name="addressline2" ref={register} placeholder='Addressline2' />
          {errors.exampleRequired && <span className='error'>This field is required</span>}

          <input name="country" ref={register({ required: true })} placeholder='Country' />
          {errors.country && <span className='error'>Country is required</span>}

          <input name="zipcode" ref={register({ required: true })} placeholder='Zip code' />
          {errors.zipcode && <span className='error'>Zip code is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
        <h2>Please pay for me</h2>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;