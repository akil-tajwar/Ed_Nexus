"use client";
import Layout from "@/component/Layout";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GiClockwork } from "react-icons/gi";
import { MdDateRange, MdOutlineSubject } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

const UserContact = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("http://localhost:3000/api/contact");
        if (response.ok) {
          const data = await response.json();
          setContact(data);
        } else {
          throw new Error("Error fetching contacts");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchContacts();
  }, []);

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
      <div className="grid grid-cols-1 gap-3 mb-7">
        <div className="bg-base-100 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center text-base">
                  <th>Name</th>
                  <th>Email</th>
                  <th>SendAt</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td>
                      <div className="font-bold text-base">{item.name}</div>
                    </td>
                    <td className="text-base">
                      {item.email}
                      <br />
                    </td>
                    <td>{extractTimeFromISO(item.createdAt)}</td>
                    <td>
                      <button
                        className="btn bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() =>
                          document.getElementById(`my_modal_${index}`).showModal()
                        }
                      >
                        Message
                      </button>
                      <dialog
                        id={`my_modal_${index}`}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h1>{item.description}</h1>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn" onClick={() => document.getElementById(`my_modal_${index}`).close()}>
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
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
};

export default UserContact;

