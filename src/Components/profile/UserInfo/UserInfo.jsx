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

const UserInfo = () => {
    const { data: session } = useSession();
    return (
        <div className='pb-6'>
            <div className="w-80 h-80 relative text-center">
                <Image
                    className="rounded-lg w-full h-full object-cover border-4 border-[#0083db]"
                    src={session?.user?.image}
                    width={600}
                    height={600}
                    alt="user photo"
                />
            </div>
            <div className='pt-5'>
                <div className='flex gap-5 items-center'>
                    <h3 className='text-4xl font-semibold text-[#0083db]'>{session?.user?.name}</h3>
                    <HiOutlinePencilAlt className='text-2xl cursor-pointer' />
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
        </div>
    );
};

export default UserInfo;