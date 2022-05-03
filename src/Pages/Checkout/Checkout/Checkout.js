import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    // const [user, setUser] = useState({
    //     name: 'Akbar the great',
    //     email: 'emperor@moghol.empire',
    //     address: 'agra, old delhi',
    //     phone: '0171111111111'
    // });

    const handleOrder = (event) => {
        event.preventDefault();
        const order  = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }

        axios.post('http://localhost:5000/order', order)
        .then(function (response) {
            console.log(response);
            if (response.data.insertedId) {
                toast('order placed');
            }
          })
    }
    return (
        <div className='w-25 mx-auto'>
            <h2>Please Checkout for: <br /> {service.name}</h2>
            <form onSubmit={handleOrder}>
                <input className='w-100 mb-3' type="text" name="name" id="" value={user?.displayName} placeholder='name' readOnly disabled/>
                <br />
                <input className='w-100 mb-3' type="email" name="email" id="" value={user?.email} placeholder='email' readOnly disabled/>
                <br />
                <input className='w-100 mb-3' type="text" name="service" id="" value={service.name} placeholder='service' readOnly disabled/>
                <br />
                <input className='w-100 mb-3' type="text" name="address" id="" value={user.address} placeholder='address' autoComplete='off' required/>
                <br />
                <input className='w-100 mb-3' type="tel" name="phone" id="" value={user.phone} placeholder='phone' required/>
                <br />
                <input type="submit" value="Place Order" />
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Checkout;