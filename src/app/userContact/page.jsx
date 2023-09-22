"use client"
import Layout from '@/component/Layout';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { GiClockwork } from 'react-icons/gi';
import { MdDateRange, MdOutlineSubject } from 'react-icons/md';
import { RiFileList2Line } from 'react-icons/ri';

const UserContact = () => {
    const [contact, setContact] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/api/contact');
                if (response.ok) {
                    const data = await response.json();
                    setContact(data);
                } else {
                    throw new Error('Error fetching products');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);
    console.log(contact, "contact");

    function extractTimeFromISO(isoTimestamp) {
        const dateObj = new Date(isoTimestamp);
        const timeOffset = 6 * 60 * 60 * 1000;
        dateObj.setTime(dateObj.getTime() + timeOffset);
        const hours = dateObj.getUTCHours().toString().padStart(2, "0");
        const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }

    return (
        <Layout>
            <div className='grid grid-cols-3 gap-3'>
            {contact.map((item) => (
                <div
                    key={item._id}
                    className="card bg-base-100 py-2 shadow-2xl border-t-4 border-[#0083db]"
                >
                    <div className="card-body  mt-3 ml-2 m-0 p-0">
                        <div className="flex items-center gap-3">

                            <div className='flex items-center gap-2'>
                                <h1 className="text-xl font-semibold">{item.name}</h1>
                                <h1 className='text-accent'>{extractTimeFromISO(item.createdAt)}</h1>
                            </div>
                        </div>
                        <div className="space-y-2 mt-2">
                            <h2 className="card-title text-[#0083db] text-lg font-bold">
                                <MdOutlineSubject size="1.2em" />
                                {item.description}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </Layout>
    );
};

export default UserContact;