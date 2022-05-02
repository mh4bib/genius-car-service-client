import React, { useEffect, useState } from 'react';
import useService from '../../hooks/useService';

const DeleteService = () => {
    const [services, setServices] = useService();

    const handleDelete = (id) =>{
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {
            const url =`http://localhost:5000/service/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                const remaining = services.filter(service=>service._id !==id);
                setServices(remaining);
            })
        }
    }

    return (
        <div>
            <h1>Delete Service</h1>
            {
                services.map(service=>
                <div key={service._id}><h5>{service.name} <button onClick={()=>handleDelete(service._id)}>X</button></h5></div>)
            }
        </div>
    );
};

export default DeleteService;