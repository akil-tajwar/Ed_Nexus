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
    console.log(contact, "constact");
    return (
        <Layout>
            {contact.map((item) => (
                <div
                    key={item?.course_id}
                    className="card bg-base-100 my-2 shadow-2xl border-t-4 border-[#0083db]"
                >
                    <div className="card-body  mt-3 ml-2 m-0 p-0">
                        <div className="flex items-center gap-3">

                            <div>
                                <h1 className="text-2xl mt-3 ml-2 font-bold">{item.name}</h1>
                                <p className='ml-2 '>{item.createdAt}</p>
                            </div>
                        </div>
                        <div className="space-y-2 mt-2">
                            <h2 className="card-title text-[#0083db] text-2xl font-bold">
                                <MdOutlineSubject size="1.4em" />
                                Description
                            </h2>
                            <div className="text-base text-gray-600 ">
                                <h1 className='ml-2'>{item.description}</h1>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="avatar">
                                <div className="w-12 rounded-full">

                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Ripley here"
                                className="input mb-3 input-bordered input-info w-full"
                                style={{ marginLeft: "500px" }}
                            />
                            <AiOutlineSend className='mr-3 mb-5' size="2.6em" />
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    );
};

export default UserContact;