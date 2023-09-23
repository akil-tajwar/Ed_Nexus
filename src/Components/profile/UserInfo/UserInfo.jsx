'use client'
import React from 'react';
import person from "../../../asstes/images/person2.jpg";
import Image from 'next/image';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { openModal, closeModal } from 'daisyui';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { imageUpload } from '@/apiHook/imageUpload';
import { toast } from 'react-toastify';


const UserInfo = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { data: session, update, userUpdateProfile } = useSession();
    console.log(session)
    const userImage = session?.user?.image;
    const name = session?.user?.name;
    const handleName = async (data) => {
        console.log(data.name)
        const name = data.name;
        if (name) {

            const res = await axios.put("http://localhost:3000/api/register", { name });

            const data = res.data;
            if (!data.message) {
                return null;
            }
            update({ name })
        }
    }
    const handleEmageChange = async (data) => {
        const image = data.image[0]
        console.log(image)
        try {
            const formData = new FormData();
            formData.append('image', image);
            const imageUploadResponse = await imageUpload(formData);
            if (imageUploadResponse.success) {
                const image = imageUploadResponse.data.display_url
                const res = await axios.put("http://localhost:3000/api/updateProfile", { image });
                const data = res.data;
                if (!data.message) {
                    return null;
                }
                userUpdateProfile({ image })
                reset()
                toast.success('user profile update', { position: "top-center" })
            }
            else {
                toast.error('Image upload failed');
            }
        } catch (error) {

        }
        console.log(data)
    }
    return (
        <div className='pb-6'>
            <div className="w-80 h-80 relative text-center">
                <Image
                    className="rounded-lg w-full h-full object-cover border-4 border-[#0083db]"
                    src={userImage}
                    width={600}
                    height={600}
                    alt="user photo"
                />

                <form
                    onSubmit={handleSubmit(handleEmageChange)}
                >
                    <div className="flex items-center justify-center absolute top-0 right-0 ">
                        <label for="dropzone-file" className="flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                <HiOutlinePencilAlt className='text-2xl cursor-pointer' />
                            </div>
                            <input
                                {...register("image", { required: "image is required!" })}
                                id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                    <button type='submit'>Update</button>
                </form>
            </div>
            <div className='pt-5'>
                <div className='flex gap-5 items-center'>
                    <h3 className='text-4xl font-semibold text-[#0083db]'>{name}</h3>
                    <HiOutlinePencilAlt className='text-2xl cursor-pointer'
                        onClick={() => window.my_modal_5.showModal()}
                    />
                    {/* <button className="btn" onClick={() => window.my_modal_1.showModal()}>open modal</button> */}
                    <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </div>
                        </form>
                    </dialog>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor corporis eius culpa, ratione praesentium excepturi!</p>
                <div className='flex gap-2 items-center mt-4'>
                    <GiGraduateCap className='text-2xl text-[#3c3c3c]' />
                    <p>University of London</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <MdLocationOn className='text-2xl pr-1 text-[#3c3c3c]' />
                    <p>Sunset Point, London</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <FaFacebookSquare className='text-lg text-[#3c3c3c]' />
                    <p>https://www.facebook.com/nora-allen.com</p>
                </div>
            </div>
            {/* name change dialog */}
            <dialog id="my_modal_5" className="modal">
                <form
                    method="dialog"
                    className="modal-box w-96 max-w-5xl"
                    onSubmit={handleSubmit(handleName)}
                >
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">New Name Here</span></label>
                        <input type="name" {...register("name", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className="modal-action">
                        <button className="btn bg-[#0083db] text-white" type="submit">
                            Submit
                        </button>
                        <button
                            className="btn bg-[#d83e26] text-white"
                            onClick={() => window.my_modal_5.close()}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default UserInfo;