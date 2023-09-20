// components/ProductList.js
"use client"
import Layout from '@/component/Layout';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaUserTie } from 'react-icons/fa';

function CouseDetails() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/api/courses/create');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          throw new Error('Error fetching products');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);
  console.log(courses.courses);
  return (
    <Layout>

      {/* <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul> */}
      <div>
        <div className="grid grid-cols-1 gap-3 mb-7">

          <div class="flex items-center justify-between py-4 bg-white ">
            <div>
              <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5  dark:text-gray-400  " type="button">
                <span class="sr-only">Action button</span>
                Action
                <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44  ">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white">Reward</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white">Promote</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white">Activate account</a>
                  </li>
                </ul>
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div>
              </div>
            </div>
            <label for="table-search" class="sr-only text-black">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-black border  rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
            </div>
          </div>
          <div className="bg-base-100 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-center text-base">
                    <th>Course Image</th>

                    <th>Course Name</th>
                    <th>Owner Name</th>

                    <th>Owner Email</th>
                    <th>Course Id</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {courses.courses?.map((item) => (
                    <tr key={item.course_id} className="text-center">
                      <td>

                        <div className="flex justify-center items-center space-x-3">

                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src={item.picture}
                                alt="" fill={true} />
                            </div>
                          </div>

                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-base">{item.courseName}</div>


                      </td>
                      <td className='text-base'>
                        {item.ownerName}
                        <br />

                      </td>

                      <td>
                        {item.ownerEmail}
                      </td>
                      <td>
                        {item.chatID}
                      </td>
                      <th>

                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-blue-700 btn-outline text-white btn-xs" onClick={() => document.getElementById('my_modal_3').showModal()}>Details</button>
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <div className="hero  bg-base-200">
                              <div className="hero-content ">


                                <div className='' >
                                  <div className='ml-12 text-center'>
                                    <FaUserTie className="w-80 h-72  text-center items-center border border-[#0083db]  text-[#0083db] "></FaUserTie>
                                    <Image src="" alt="" fill={true} />
                                  </div>
                                  <h1 className="text-xl mt-8
                                                font-bold">Name:Towhidul Islam </h1>
                                  <p className=" pt-2">
                                    Profession: Web-Developer
                                  </p>
                                  <p className=" ">
                                    Email: towhid.raiyan@gmail.com
                                  </p>

                                </div>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </th>


                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div >

      </div>
    </Layout>
  );
}

export default CouseDetails;
