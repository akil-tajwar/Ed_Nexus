"use client";
import React, { PureComponent } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdPaper } from "react-icons/io";
import { BsJournalBookmarkFill, BsLinkedin } from "react-icons/bs";
import {
    FaAward,
    FaBell,
    FaInstagramSquare,
    FaTwitterSquare,
} from "react-icons/fa";
import { BiLogoFacebookSquare } from "react-icons/bi";

import { AiOutlineRight } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import CountUp from "react-countup";
import Layout from "@/component/Layout";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useState } from "react";
import { useEffect } from "react";

const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [blog, setBlog] = useState([]);
    const [courses, setCourses] = useState([]);
    const [notification, setNotification] = useState([]);

    //  get user?
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("http://localhost:3000/api/user");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    throw new Error("Error fetching products");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);
    console.log(users.length, "yser");
    // get blog?
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("http://localhost:3000/api/blogs");
                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                } else {
                    throw new Error("Error fetching products");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);
    console.log(blog.length, "blog");
    // get courses
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/courses/create"
                );
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    throw new Error("Error fetching products");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);

    const Length = courses?.courses;
    console.log(Length);
    // get notification/
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:3000/api/notification");
                if (response.ok) {
                    const data = await response.json();
                    setNotification(data);
                } else {
                    throw new Error("Error fetching products");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);
    console.log(notification?.length, "notification");

    const data = [
        {
            name: "week 1",
            female: 4000,
            male: 2400,
            amt: 2400,
        },
        {
            name: "week 2",
            female: 3000,
            male: 1398,
            amt: 2210,
        },
        {
            name: "week 3",
            female: 2000,
            male: 9800,
            amt: 2290,
        },
        {
            name: "week 4",
            female: 2780,
            male: 3908,
            amt: 2000,
        },
        {
            name: "week 5",
            female: 1890,
            male: 4800,
            amt: 2181,
        },
        {
            name: "week 6",
            female: 2390,
            male: 3800,
            amt: 2500,
        },
        {
            name: "week 7",
            female: 3490,
            male: 4300,
            amt: 2100,
        },
    ];

    const piechar = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Layout className="lg:w-3/4 w-11/12 mt-4 mx-auto pt-16">
            {/* Create your Component */}
            <p className="text-4xl font-semibold">Admin Dashboard</p>

            {/* Mini Card Component Here*/}
            <div className="grid grid-cols-4 gap-3 mt-6 mb-4">
                <div className="card w-auto  bg-indigo-300 shadow-xl">
                    <div className="card-body flex-row items-center justify-evenly">
                        <div className="avatar placeholder">
                            <div className="bg-[#D1F3E0] text-neutral-content rounded-full w-24">
                                <HiOutlineUserGroup size="3.5em" color="#3CB878" />
                            </div>
                        </div>
                        <div className="flex flex-col    space-y-3 justify-center">
                            <p className="text-2xl font-bold text-white">User</p>
                            <div className="flex items-center">
                                <CountUp
                                    delay={1}
                                    end={users?.length}
                                    className="text-black text-2xl font-semibold"
                                />
                                <span className="text-2xl font-semibold">+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto bg-[#1D9BF0] shadow-xl">
                    <div className="card-body flex-row items-center justify-evenly">
                        <div className="avatar placeholder">
                            <div className="bg-[#E1F1FF] text-neutral-content rounded-full w-24">
                                <IoMdPaper size="3.5em" color="#3F7AFC" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 justify-center">
                            <p className="text-2xl font-bold text-white">Blogs</p>
                            <div className="flex items-center">
                                <CountUp
                                    delay={1}
                                    end={blog?.length}
                                    className="text-black text-2xl font-semibold"
                                />
                                <span className="text-2xl font-semibold">+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto bg-indigo-300 shadow-xl">
                    <div className="card-body flex-row items-center justify-evenly">
                        <div className="avatar placeholder">
                            <div className="bg-[#FFF2D8] text-neutral-content rounded-full w-24">
                                <FaBell size="3.5em" color="#FFAE27" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 justify-center">
                            <p className="text-2xl font-bold text-white">Notification</p>
                            <div className="flex items-center">
                                <CountUp
                                    delay={1}
                                    end={notification?.length}
                                    className="text-black text-2xl font-semibold"
                                />
                                <span className="text-2xl font-semibold">+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto bg-[#1D9BF0] shadow-xl">
                    <div className="card-body flex-row items-center justify-evenly">
                        <div className="avatar placeholder">
                            <div className="bg-[#FFEAEA] text-neutral-content rounded-full w-24">
                                <BsJournalBookmarkFill size="3.5em" color="#FF0000" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 justify-center">
                            <p className="text-2xl font-bold text-white">Courses</p>
                            <div className="flex items-center">
                                <CountUp
                                    delay={2}
                                    end={Length?.length}
                                    className="text-black text-2xl font-semibold"
                                />
                                <span className="text-2xl font-semibold">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ??chart */}

            <div className=" mb-20 mt-8 h-12 pl-32 ">
                <h1 className="text-3xl font-semibold mb-4">Number Of Students</h1>
                <ResponsiveContainer c width="80%" height="800%">
                    <BarChart
                        className="h-11"
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="male" fill="#8884d8" />
                        <Bar dataKey="female" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Social Component Here */}
            <div
                style={{ marginTop: "440px" }}
                className="grid grid-cols-4 gap-3  mb-10"
            >
                <div className="card w-auto bg-[#1877F2] shadow-2xl">
                    <div className="card-body flex-row items-center justify-between">
                        <div className="text-white">
                            <h1 className="text-lg">Follow on facebook</h1>
                            <div className="flex items-center">
                                <CountUp
                                    delay={2}
                                    end={1000}
                                    className="text-3xl font-semibold"
                                />
                                <span className="text-2xl font-bold">+</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="avatar placeholder p-1 bg-white rounded-xl">
                                <div className="text-neutral-content rounded-xl w-20">
                                    <BiLogoFacebookSquare size="3.5em" color="#1877F2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto bg-[#1D9BF0] shadow-2xl">
                    <div className="card-body flex-row items-center justify-between">
                        <div className="text-white">
                            <h1 className="text-lg">Follow on twitter</h1>
                            <div className="flex items-center">
                                <CountUp
                                    delay={2}
                                    end={500}
                                    className="text-3xl font-semibold"
                                />
                                <span className="text-2xl font-bold">+</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="avatar placeholder p-1 bg-white rounded-xl">
                                <div className="text-neutral-content rounded-xl w-20">
                                    <FaTwitterSquare size="3.5em" color="#1D9BF0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto bg-[#FE643B] shadow-2xl">
                    <div className="card-body flex-row items-center justify-between">
                        <div className="text-white">
                            <h1 className="text-lg">Follow on instagram</h1>
                            <div className="flex items-center">
                                <CountUp
                                    delay={2}
                                    end={800}
                                    className="text-3xl font-semibold"
                                />
                                <span className="text-2xl font-bold">+</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="avatar placeholder p-1 bg-white rounded-xl">
                                <div className="text-neutral-content rounded-xl w-20">
                                    <FaInstagramSquare size="3.5em" color="#FE643B" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto bg-[#0A66C2] shadow-2xl">
                    <div className="card-body flex-row items-center justify-between">
                        <div className="text-white">
                            <h1 className="text-lg">Follow on linkedin</h1>
                            <div className="flex items-center">
                                <CountUp
                                    delay={2}
                                    end={900}
                                    className="text-3xl font-semibold"
                                />
                                <span className="text-2xl font-bold">+</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="avatar placeholder p-1 bg-white rounded-xl">
                                <div className="text-neutral-content rounded-xl w-20">
                                    <BsLinkedin size="3.5em" color="#0A66C2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
