import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const url = 'http://localhost:5000/service';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
        })
    };
    return (
        <div className='w-25 mx-auto'>
            <h1>Add Service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='service name' {...register("name", { required: true, maxLength: 20 })} /> <br />
                <textarea placeholder='service description' {...register("description")} /> <br />
                <input type="number" placeholder='service price'{...register("price", { min: 18, max: 99 })} /> <br />
                <input type="text" placeholder='photo url' {...register("img")} /> <br />
                <input type="submit" value={'ADD SERVICE'} />
            </form>
        </div>
    );
};

export default AddService;