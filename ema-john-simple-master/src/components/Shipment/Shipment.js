import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';


const Shipment = () => {
    const { register, handleSubmit,  errors } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  
    return (
      
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Name'/>
        {errors.name && <span className='error'>Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Email'/>
        {errors.email && <span className='error'>Email is required</span>}

        <input name="addressline1" ref={register({ required: true })} placeholder='Addressline1'/>
        {errors.addressline1 && <span className='error'>Address is required</span>}

        <input name="addressline2" ref={register} placeholder='Addressline2'/>
        {errors.exampleRequired && <span className='error'>This field is required</span>}

        <input name="country" ref={register({ required: true })} placeholder='Country'/>
        {errors.country && <span className='error'>Country is required</span>}

        <input name="zipcode" ref={register({ required: true })} placeholder='Zip code'/>
        {errors.zipcode && <span className='error'>Zip code is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;