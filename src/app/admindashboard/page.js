"use client";
import CoursesDashboard from "@/Components/courses/CoursesDashboard";
import React, { useEffect, useState } from "react";
import gellary from "../../assets/gellary1.jpg";
import Link from "next/link";
import { setHours, setMinutes } from "date-fns";
import { useForm } from "react-hook-form";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
} from "recharts";
import {
    FaAward,
    FaChess,
    FaChessKnight,
    FaDiceD20,
    FaFootballBall,
    FaGamepad,
    FaPlaystation,
    FaSchool,
    FaTh,
    FaTrophy,
    FaUserTie,
} from "react-icons/fa";
import { GiAbstract050, GiBeachBall, GiFamilyHouse } from "react-icons/gi";
// import { FaAward } from "react-icons/ai";
import { PureComponent } from "react";
import { AreaChart } from "recharts";

import CountUp from "react-countup";
import { IoMdPaper } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Image from "next/image";

const CourseDashboard = ({ params }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const categories = [
        "User_Stats",

        "Number_Of_Students",
        "Student_Activity",
        "Teacher_Details",

        "Learning_Activity",
        "Blog",

        ,
    ];
    const [rangeValue, setRangeValue] = useState(0);
    const {
        register,

        formState: { errors },
        reset,
    } = useForm();

    const [user, setUser] = useState([]);
    const [teacher, setTeacher] = useState([]);

    const courseId = params.id;

    const handleTabClick = (index) => {
        setTabIndex(index);
    };
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 0), 9)
    );
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    function extractTimeFromISO(isoTimestamp) {
        const dateObj = new Date(isoTimestamp);
        const timeOffset = 6 * 60 * 60 * 1000;
        dateObj.setTime(dateObj.getTime() + timeOffset);
        const hours = dateObj.getUTCHours().toString().padStart(2, "0");
        const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    const currentDateLocal = new Date();
    const timeOffset = 6 * 60 * 60 * 1000;
    const currentDateBD = new Date(currentDateLocal.getTime() + timeOffset);

    // For Posting Notice Data
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

    const learning = [
        {
            name: "1st week",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "2nd week",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "3rd week",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "4th week",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "5th week",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "6th week",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "7th week",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    // getting user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/user");
                if (response.ok) {
                    const data = await response.json();
                    const findUser = data.filter((item) => item.course_id === courseId);
                    setUser(findUser);
                } else {
                    console.error("Failed to fetch assignments.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchUser();
    });
    console.log(user, "user");

    //  get courses
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/courses/create"
                );
                if (response.ok) {
                    const data = await response.json();
                    const findUser = data.filter((item) => item.course_id === courseId);
                    setTeacher(findUser);
                } else {
                    console.error("Failed to fetch assignments.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchUser();
    }, [courseId]);

    console.log(teacher, "Hello Sir");

    const categoryContent = {
        User_Stats: (
            <div className="grid grid-cols-1 gap-3 mb-7">
                <h3 className="text-3xl font-semibold mb-4">User Stats</h3>
                <div className="bg-base-100 shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Email</th>

                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {user?.map((item) => (
                                    <tr key={item.course_id} className="text-center">
                                        <td>
                                            <div className="flex justify-center items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image src={item.Image} alt="" fill={true} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                    <div className="text-sm opacity-70">
                                                        United States
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.email}
                                            <br />
                                        </td>

                                        <th>
                                            <button className="btn btn-outline btn-xs">
                                                Details
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ),
        Blog: (
            <div className="">
                <div className="me-10 mb-3 +ml-80">
                    <button
                        className="btn bg-[#0083db] text-white"
                        onClick={() => window.my_modal_5.showModal()}
                    >
                        New Blog
                    </button>
                    <dialog id="my_modal_5" className="modal">
                        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                            <h2 className="font-bold text-4xl text-[#0083db] text-center">
                                Notice
                            </h2>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <div className="form-control w-full space-y-3 shadow-2xl rounded-2xl p-5">
                                        <label className="label">
                                            <span className="label-text text-xl font-bold">
                                                Title
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("title", { required: true })}
                                            name="title"
                                            placeholder="Type here"
                                            className="input input-bordered input-primary w-full"
                                        />
                                        {errors.name && (
                                            <span className="text-red-600">title is required</span>
                                        )}
                                        <label className="label">
                                            <span className="label-text text-xl font-bold">
                                                Instruction
                                            </span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-primary"
                                            placeholder="Instruction (optional)"
                                            {...register("description")}
                                            name="description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="space-y-2 shadow-2xl rounded-2xl p-5">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-bold">For</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full max-w-xs"
                                            {...register("For")}
                                            name="For"
                                        >
                                            <option disabled selected>
                                                Select
                                            </option>
                                            <option>All Student</option>
                                        </select>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-bold">
                                                Attach Link
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="file-input file-input-bordered file-input-primary w-full px-4"
                                            {...register("attachments")}
                                            name="attachments"
                                            placeholder="Give Link Here"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button className="btn bg-[#0083db] text-white" type="submit">
                                    Post
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="card w-80 bg-base-100 shadow-xl">
                            <figure>
                                <Image
                                    alt="foodGallary"
                                    className=" rounded shadow-sm min-h-25 dark:bg-gray-500 h-auto w-[800px]"
                                    src={gellary}
                                    fill={true}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div>
                                        <h2 className="card-title mt-0">
                                            <div className="avatar">
                                                <div className="w-12 rounded-lg">
                                                    <Image src={gellary} alt="" fill={true} />
                                                </div>
                                            </div>
                                            <h1>Vincent</h1>
                                            <br />
                                            <h1>hello</h1>
                                        </h2>
                                    </div>
                                    <div></div>
                                </div>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Edit</div>
                                    <div className="badge badge-outline">Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card w-80 bg-base-100 shadow-xl">
                            <figure>
                                <Image
                                    alt=""
                                    fill={true}
                                    className=" rounded shadow-sm min-h-25 dark:bg-gray-500 h-auto w-[800px]"
                                    src={gellary}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div>
                                        <h2 className="card-title mt-0">
                                            <div className="avatar">
                                                <div className="w-12 rounded-lg">
                                                    <Image src={gellary} alt="" fill={true} />
                                                </div>
                                            </div>
                                            <h1>Vincent</h1>
                                            <br />
                                            <h1>hello</h1>
                                        </h2>
                                    </div>
                                    <div></div>
                                </div>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Edit</div>
                                    <div className="badge badge-outline">Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card w-80 bg-base-100 shadow-xl">
                            <figure>
                                <Image
                                    alt="foodGallary"
                                    fill={true}
                                    className=" rounded shadow-sm min-h-25 dark:bg-gray-500 h-auto w-[800px]"
                                    src={gellary}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div>
                                        <h2 className="card-title mt-0">
                                            <div className="avatar">
                                                <div className="w-12 rounded-lg">
                                                    <Image src={gellary} alt="" fill={true} />
                                                </div>
                                            </div>
                                            <h1>Vincent</h1>
                                            <br />
                                            <h1>hello</h1>
                                        </h2>
                                    </div>
                                    <div></div>
                                </div>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Edit</div>
                                    <div className="badge badge-outline">Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card w-80 bg-base-100 shadow-xl">
                            <figure>
                                <Image
                                    alt="foodGallary"
                                    className=" rounded shadow-sm min-h-25 dark:bg-gray-500 h-auto w-[800px]"
                                    src={gellary}
                                    fill={true}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div>
                                        <h2 className="card-title mt-0">
                                            <div className="avatar">
                                                <div className="w-12 rounded-lg">
                                                    <Image src={gellary} alt="" fill={true} />
                                                </div>
                                            </div>
                                            <h1>Vincent</h1>
                                            <br />
                                            <h1>hello</h1>
                                        </h2>
                                    </div>
                                    <div></div>
                                </div>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Edit</div>
                                    <div className="badge badge-outline">Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        Number_Of_Students: (
            <div className="">
                <h1 className="text-3xl font-semibold mb-4">Number Of Students</h1>
                <ResponsiveContainer c width="100%" height="1000%">
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
        ),
        Student_Activity: (
            <div className="overflow-x-auto">
                <h1 className="text-3xl font-semibold mb-4">Students Activity</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Name</th>
                            <th></th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaChessKnight size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">1st place in Chess</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    John Doe won 1st place in Chess
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">2 hours ago</div>
                            </th>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaTh size="2.5em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">
                                            Participated in Carrom
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    Justin Lee participated in Carrom
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">5 hours ago</div>
                            </th>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaGamepad size="2.5em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">
                                            He represents a game controller
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    Artrib participated on a game controller
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">1 day ago</div>
                            </th>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaSchool size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">
                                            Internation conference in St.John School
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    Justin Leeattended internation conference in St.John School
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">5 day ago</div>
                            </th>
                        </tr>
                        {/* roo 5 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaChess size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">He Playing on Chase</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    Jaks Pharro won 1st place in Chess
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">1 week ago</div>
                            </th>
                        </tr>
                        {/* roo 5 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaDiceD20 size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">
                                            He was try to Fadice
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    Represents a pair of dice, often used for board games
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">2 month ago</div>
                            </th>
                        </tr>
                        {/* roo 5 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaTrophy size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">1st place in Chess</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    {" "}
                                    suitable for indicating achievements and victories in games.
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">10 month ago</div>
                            </th>
                        </tr>
                        {/* roo 5 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaPlaystation size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">
                                            He was try to FaPlaystation
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    John Doe won 1st place in FaPlaystation
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">2 year ago</div>
                            </th>
                        </tr>
                        {/* roo 5 */}
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <FaChessKnight size="2.6em" color="#0083db" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">1st place in Chess</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">
                                    John Doe won 1st place in Chess
                                </h1>
                            </td>
                            <td></td>
                            <th>
                                <div className="text-sm opacity-60">2 hours ago</div>
                            </th>
                        </tr>
                    </tbody>
                    {/* foot */}
                </table>
            </div>
        ),
        Number_Of_Students: (
            <div className="mt-11 h-12">
                <h1 className="text-3xl font-semibold mb-4">Number Of Students</h1>
                <ResponsiveContainer c width="100%" height="1000%">
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
        ),
        Teacher_Details: (
            <div className="overflow-x-auto">
                <h1 className="text-3xl text-[#0083db] font-semibold mb-4">
                    Teacher Details
                </h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Course Name</th>
                            <th>Qualification</th>
                            <th>Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td className="font-bold">Cy Ganderton</td>
                            <td>Introduction to Python Programming</td>
                            <td>B.Tech</td>
                            <td className="text-green-700 text-lg font-bold">Good</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td className="font-bold">Hart Hagerty</td>
                            <td>JavaScript Fundamentals</td>
                            <td>B.E </td>
                            <td className="text-yellow-600 text-lg font-bold">Perfect</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>3</th>
                            <td className="font-bold">Benjamin</td>
                            <td>Java Programming and Object-Oriented Concepts</td>
                            <td>B.Tech</td>
                            <td className="text-blue-600 text-lg font-bold">Better</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>4</th>
                            <td className="font-bold">Jaks Pherro</td>
                            <td>Web Design</td>
                            <td>B.E </td>
                            <td className="text-red-600 text-lg font-bold">Bad</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>5</th>
                            <td className="font-bold ">Hart Hagerty</td>
                            <td>JavaScript Fundamentals</td>
                            <td>B.E </td>
                            <td className="text-yellow-600 text-lg font-bold">Perfect</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>6</th>
                            <td className="font-bold">Hart Hagerty</td>
                            <td>JavaScript Fundamentals</td>
                            <td>B.E </td>
                            <td className="text-yellow-600 text-lg font-bold">Perfect</td>
                        </tr>
                        {/* row 3 */}
                        {/* row 1 */}
                        <tr>
                            <th>7</th>
                            <td className="font-bold">Cy Ganderton</td>
                            <td>Introduction to Python Programming</td>
                            <td>B.Tech</td>
                            <td className="text-green-700 text-lg font-bold">Good</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>8</th>
                            <td className="font-bold">Hart Hagerty</td>
                            <td>JavaScript Fundamentals</td>
                            <td>B.E </td>
                            <td className="text-yellow-600 text-lg font-bold">Perfect</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>9</th>
                            <td className="font-bold">Benjamin</td>
                            <td>Java Programming and Object-Oriented Concepts</td>
                            <td>B.Tech</td>
                            <td className="text-blue-600 text-lg font-bold">Better</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>10</th>
                            <td className="font-bold">Jaks Pherro</td>
                            <td>Web Design</td>
                            <td>B.E </td>
                            <td className="text-red-600 text-lg font-bold">Bad</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>11</th>
                            <td className="font-bold ">Hart Hagerty</td>
                            <td>JavaScript Fundamentals</td>
                            <td>B.E </td>
                            <td className="text-yellow-600 text-lg font-bold">Perfect</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>12</th>
                            <td className="font-bold">Hart Hagerty</td>
                            <td>JavaScript Fundamentals</td>
                            <td>B.E </td>
                            <td className="text-yellow-600 text-lg font-bold">Perfect</td>
                        </tr>
                        {/* row 3 */}
                    </tbody>
                </table>
            </div>
        ),
        Learning_Activity: (
            <div className="">
                <h1 className="text-3xl text-[#0083db] font-semibold mb-4">
                    Learning Activity
                </h1>
                <div className="mt-10" style={{ width: "100%" }}>
                    <h4 className="mt-9 mb-5 font-bold text-xl">Teachers Activity</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart
                            width={500}
                            height={200}
                            data={learning}
                            syncId="anyId"
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#8884d8"
                                fill="#8884d8"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    <p className="mt-9 mb-5 font-bold text-xl">Students Activity</p>

                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart
                            width={500}
                            height={200}
                            data={learning}
                            syncId="anyId"
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="pv"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ),

        Grades: "Grades content goes here",
    };
    return (
        <div className="pt-32 w-3/4 mx-auto mb-10">
            <div className="grid grid-cols-3 w-3User Stats/3 gap-5">
                <div className="border-4 border-[#0083db] p-5 rounded-lg">
                    <FaUserTie className="w-80 h-72  border border-[#0083db]  text-[#0083db] "></FaUserTie>
                    <div className="pb-4 w-2/3 pt-2">
                        <h3 className="text-4xl mt-5 text-[#0083db] font-semibold">
                            Dashboard !!
                        </h3>
                    </div>
                    <div className="">
                        {categories.map((category, index) => (
                            <Link
                                href="#"
                                key={index}
                                className={`font-semibold text-xl mb-2 flex flex-col ${tabIndex === index
                                    ? "tab-active text-[#0083db] pl-2 border-l-2 border-[#0083db]"
                                    : ""
                                    }`}
                                onClick={() => handleTabClick(index)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="border-4 border-[#0083db] h-[670px] overflow-y-scroll p-5 col-span-2 rounded-lg">
                    {/* {menu.filter((item) => item.category === categories[tabIndex]).map(item => (
                        <div item={item} key={item._id}>

                        </div>
                    ))} */}
                    <div className="">
                        <div>{categoryContent[categories[tabIndex]]}</div>
                    </div>
                </div>
            </div>
            <CoursesDashboard />
        </div>
    );
};

export default CourseDashboard;
