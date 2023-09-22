'use client'
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

const BlogDetails = ({ params }) => {
    console.log(params);
    const [singleBlog, setSingleBlog] = useState([])
    useEffect(() => {
        fetch('https://ed-nexus.vercel.app/api/blogs')
            .then(res => res.json())
            .then(data => {
                const blog = data.find(item => item._id === params.id)
                setSingleBlog(blog)
            })
            .catch(error => console.log(error))
    });
    console.log(singleBlog);
    return (
        <div className='pt-32 mb-20 lg:w-3/4 w-11/12 mx-auto'>
            <div>
                <h1 className='text-5xl border-l-4 border-[#0083db] pl-5 py-2 font-semibold'>{singleBlog.title}</h1>
                <div></div>
            </div>
            <div className='flex justify-between items-center pt-8 pb-5'>
                <div className='flex gap-4'>
                    <div className='relative h-14 w-14'>
                        <Image className='w-full h-full rounded-full object-cover border-2 border-[#0083db]' src={singleBlog.image} alt="" fill={true} />
                    </div>
                    <div>
                        <h5 className='text-xl font-semibold'>{singleBlog.author}</h5>
                        <p>Sep 18, 2023</p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <button>
                            {
                                <AiOutlineLike className="text-2xl text-[#0083db]" />
                            }
                        </button>
                        <p>0</p>
                        {/* <p>{blog.likes}</p> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <button>
                            {
                                <AiOutlineDislike className="text-2xl text-[#0083db]" />
                            }
                        </button>
                        <p>0</p>
                        {/* <p>{blog.dislikes}</p> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => window.my_modal_5.showModal()}>
                            {
                                <BiCommentDetail className="text-2xl text-[#0083db]" />
                            }
                        </button>
                        <dialog id="my_modal_5" className="modal">
                            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                                <textarea className="w-full rounded-lg" name="" id="" cols="30" rows="10"></textarea>
                                <div className="modal-action">
                                    <button className="btn bg-[#0083db] text-white" type="submit">
                                        Post
                                    </button>
                                    <button className="btn bg-[#d83e26] text-white" onClick={() => window.my_modal_5.close()} >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </dialog>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="relative w-full h-96 pb-10">
                    <Image className="h-full w-full object-cover rounded-lg" src={singleBlog.image} alt="" fill={true} />
                </div>
                <p>{singleBlog.content}</p>
            </div>
        </div>
    );
};

export default BlogDetails;