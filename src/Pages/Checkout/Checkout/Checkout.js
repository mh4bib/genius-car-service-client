import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Checkout: {service.name}</h2>
            <form>
                <input type="text" name="name" id="" placeholder='name'/>
            </form>
        </div>
    );
};

export default Checkout;