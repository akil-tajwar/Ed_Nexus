// components/ProductList.js
"use client";
import Layout from "@/component/Layout";

import React, { useState, useEffect } from "react";
import { FaUser, FaUserShield, FaUserTie } from "react-icons/fa";
import IMAGE from "../../assets/unnamed.png";
import Image from "next/image";
import Swal from "sweetalert2";

function Userlist() {
  const [users, setUsers] = useState([]);

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
  }, [users]);
  //   console.log(users, "yser");

  const makeAdmin = async (email) => {
    if (users) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/" + email,
          {
            method: "PUT",
          }
        );
        if (response) {
          Swal.fire("Updated!", "This user is now Admin.", "success").then(
            () => {}
          );
        } else if (response.status === 404) {
          Swal.fire("Error!", "User not found.", "error");
        } else {
          Swal.fire("Error!", "Failed to make user Admin.", "error");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const deleteUser = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/user/" + email, {
          method: "DELETE",
        })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              Swal.fire("Deleted!", "User has been deleted.", "success").then(
                () => {}
              );
            } else if (response.status === 404) {
              Swal.fire("Error!", "User not found.", "error");
            } else {
              Swal.fire("Error!", "Failed to delete user.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the user.",
              "error"
            );
          });
      }
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-3 mb-7">
        {/* <div class="flex items-center justify-between p-4 bg-white ">
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
                </div> */}
        <div className="bg-base-100 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-center text-base">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Edit User</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users?.map((item) => (
                  <tr key={item.course_id} className="text-center">
                    <td>
                      <div className="flex justify-center items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image src={item.image} alt="" fill={true} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-base">{item.name}</div>
                    </td>
                    <td className="text-base">
                      {item.email}
                      <br />
                    </td>
                    <td className="text-base">
                      {item.role}
                      <br />
                    </td>

                    <th>
                      {item.role === "member" ? (
                        <button
                          className="btn bg-blue-700 btn-outline text-white btn-xs"
                          onClick={() => makeAdmin(item.email)}
                        >
                          <FaUserShield></FaUserShield>Make Admin
                        </button>
                      ) : (
                        <button
                          className="btn bg-blue-700 btn-outline text-white btn-xs"
                          disabled="disabled"
                        >
                          <FaUserShield></FaUserShield>Make Admin
                        </button>
                      )}
                    </th>
                    <td>
                      <button
                        className="btn bg-red-700 btn-outline text-white btn-xs"
                        onClick={() => deleteUser(item.email)}
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Userlist;
