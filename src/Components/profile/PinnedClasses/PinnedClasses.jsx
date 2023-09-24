'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

const PinnedClasses = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleAddDoctor = data => {
        console.log(data)
    }
    return (
        <div className='grid grid-cols-2 gap-6 p-5 '>
            {/* <div className='w-96 p-7'>
                <h2 className="text-4xl">Add A Doctor</h2>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
                </form>
            </div> */}
            <div>
                <h1>name</h1>
                <p></p>
            </div>
            <div></div>
        </div>
    );
};

export default PinnedClasses;