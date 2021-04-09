import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IFKV2KMTiWAkqg1xBNMjD6WLgVe0jswLzFV3RbKdksftoftd3Mg2WeOsTnYtS9ANET8cNc6dSvKW1g2lHYXDvHd00vl5Y4nyE');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            
        </Elements>
    );
};

export default ProcessPayment;