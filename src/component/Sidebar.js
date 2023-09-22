"use client"
import Link from "next/link";
import { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaBloggerB, FaBrain, FaHome, FaUserCheck, FaUsers } from "react-icons/fa";
import { HiFolder } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    return (
        <div className="">
            <div style={{ height: "200%" }}
                className={` ${open ? "lg:w-40" : "lg:w-60 "
                    } flex flex-col  p-3 w-full  bg-[#0083db]  shadow duration-300`}
            >
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <a className="btn btn-ghost normal-case text-xl md:text-3xl text-white">
                            ED_NEXUS
                        </a>
                        <button onClick={() => setOpen(!open)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        {/* <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                        /> */}
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <FaUserCheck className="w-6 h-6 text-gray-100"></FaUserCheck>
                                    <span className="text-gray-100  text-base">Admin</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    href="/Userlist"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <FaUsers className="w-6 h-6 text-gray-100" ></FaUsers>

                                    <span className="text-gray-100 text-base">User Status</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    href="/CouseDetails"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <TbListDetails className="w-6 h-6 text-gray-100"></TbListDetails>

                                    <span className="text-gray-100 text-base">Course Details</span>
                                </Link>
                            </li>
                            <li className="rounded-sm mb-8">
                                <Link
                                    href="/students"
                                    className="flex items-center p-2 mb-5 space-x-3 rounded-md"
                                >


                                    <AiOutlineAppstore className="w-6 h-6 text-gray-100"></AiOutlineAppstore>
                                    <span className="text-gray-100 text-base">Students Activity</span>
                                </Link>
                            </li>
                            <div className="divide-y divide-slate-200 ">
                                <hr />

                            </div>
                            <li className="rounded-sm">
                                <Link
                                    href="/"
                                    className="flex items-center mt-5 p-2 space-x-3 rounded-md"
                                >

                                    <FaHome className="w-6 h-6 text-gray-100"></FaHome>
                                    <span className="text-gray-100 text-base">Home</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    href="/courses"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <HiFolder className="w-6 h-6 text-gray-100"></HiFolder>
                                    <span className="text-gray-100 text-base">Courses</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    href="/blogs"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >


                                    <FaBloggerB className="w-6 h-6 text-gray-100"></FaBloggerB>
                                    <span className="text-gray-100 text-base">Blog</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    href="/chat"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >


                                    <BsFillChatDotsFill className="w-6 h-6 text-gray-100"></BsFillChatDotsFill>
                                    <span className="text-gray-100 text-base">Chat</span>
                                </Link>
                            </li>

                            <li className="rounded-sm">
                                <Link
                                    href="/settings"
                                    className="flex mt-40 items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-100 text-base">Settings</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    href="/logout"
                                    className="flex  items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="text-white font-bold text-base">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}