"use client"
import Layout from '@/component/Layout';
import React from 'react';
import { FaChess, FaChessKnight, FaDiceD20, FaGamepad, FaPlaystation, FaSchool, FaTh, FaTrophy } from 'react-icons/fa';

const students = () => {
    return (
        <Layout>
            <div className="overflow-x-auto p-10">
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
                                        <div className="font-bold text-xl">1st place in Chess
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">John Doe won 1st place in Chess</h1>


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
                                        <div className="font-bold text-lg">Participated in Carrom
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">Justin Lee participated in Carrom</h1>


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
                                        <div className="font-bold text-xl">He represents a game controller
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">Artrib participated on a game controller</h1>


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
                                        <div className="font-bold text-xl">Internation conference in St.John School

                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">Justin Leeattended internation conference in St.John School
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
                                        <div className="font-bold text-xl">He Playing on Chase
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">Jaks Pharro won 1st place in Chess</h1>


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
                                        <div className="font-bold text-xl">He was try to Fadice
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">Represents a pair of dice, often used for board games</h1>


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
                                        <div className="font-bold text-xl">1st place in Chess
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80"> suitable for indicating achievements and victories in games.</h1>


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
                                        <div className="font-bold text-xl">He was try to FaPlaystation
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">John Doe won 1st place in FaPlaystation</h1>


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
                                        <div className="font-bold text-xl">1st place in Chess
                                        </div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h1 className="text-sm opacity-80">John Doe won 1st place in Chess</h1>


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
        </Layout>
    );
};

export default students;