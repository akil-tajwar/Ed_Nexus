"use client";
import CoursesDashboard from "@/Components/courses/CoursesDashboard";
import React, { useEffect, useState } from "react";
import person from "../../../asstes/images/person2.jpg";
import Image from "next/image";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { useForm } from "react-hook-form";
import { GiClockwork } from "react-icons/gi";
import { MdOutlineSubject, MdDateRange } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

const CourseDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const categories = [
    "Notice",
    "Members",
    "Assignments",
    "Grades",
    "Resourses",
  ];
  const [rangeValue, setRangeValue] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [oldassignment, setOldssignment] = useState([]);
  const [member, setMember] = useState([]);

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

  const onSubmit = async (data) => {
    const { title, description, startDate, For, topic, attachments } = data;
    const newAssignment = {
      course_id: "",
      title,
      description,
      due_date: startDate,
      attachments: [
        {
          url: attachments,
        },
      ],
      submissions: [],
      notices: [],
      comments: [],
      reviews: [],
      For: For,
      topic: topic,
      total_mark: rangeValue,
    };

    try {
      const result = await fetch("http://localhost:3000/api/assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssignment),
      });

      if (result.ok) {
        const responseData = await result.json();
        console.log("Assignment added:", responseData);
      } else {
        console.error("Failed to add assignment.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // For Assignment
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/assignment");
        if (response.ok) {
          const data = await response.json();
          setOldssignment(data);
        } else {
          console.error("Failed to fetch assignments.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAssignments();
  }, []);
    // For Member
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user");
        if (response.ok) {
          const data = await response.json();
          setMember(data);
        } else {
          console.error("Failed to fetch assignments.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAssignments();
  }, []);

  const categoryContent = {
    Notice: (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-[#0083db] mx-10">Notices</h2>
          <div className="me-10">
            {/* Open the modal using ID.showModal() method */}
            <button
              className="btn bg-[#0083db] text-white"
              onClick={() => window.my_modal_5.showModal()}
            >
              New Notice
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <form method="dialog" className="modal-box">
                <textarea
                  className="textarea textarea-info w-full flex"
                  placeholder="Notice Text"
                ></textarea>

                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn bg-[#0083db] text-white">POST</button>
                  <button className="btn bg-[#d83e26] text-white">
                    Cancel
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>

        <div className="card bg-base-100 my-5 p-2 shadow">
          {/* <figure className="avatar">
                <div className="w-1/2 rounded-xl mx-auto">
                  <Image src={item.picture} alt="My Image" width={200} height={200} />
                </div>
              </figure> */}
          <div className="card-body ">
            <h2 className="card-title text-[#0083db]">Robert Bruce</h2>
            <p className=" font-semibold">
              <span>27/07/2023</span> <span className="px-6">7.30 PM</span>{" "}
            </p>
            <p className="text-base text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              aliquam aliquid doloremque quod suscipit optio maxime quia sed,
              natus voluptates alias veritatis unde, nobis hic temporibus vitae
              beatae velit quas!
            </p>
          </div>
        </div>
        <div className="card bg-base-100 my-5 p-2 shadow">
          {/* <figure className="avatar">
                <div className="w-1/2 rounded-xl mx-auto">
                  <Image src={item.picture} alt="My Image" width={200} height={200} />
                </div>
              </figure> */}
          <div className="card-body ">
            <h2 className="card-title text-[#0083db]">Robert Bruce</h2>
            <p className=" font-semibold">
              <span>07/07/2023</span> <span className="px-6">5.30 PM</span>{" "}
            </p>
            <p className="text-base text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              aliquam aliquid doloremque quod suscipit optio maxime quia sed,
              natus voluptates alias veritatis unde, nobis hic temporibus vitae
              beatae velit quas!
            </p>
          </div>
        </div>
        <div className="card bg-base-100 my-5 p-2 shadow">
          {/* <figure className="avatar">
                <div className="w-1/2 rounded-xl mx-auto">
                  <Image src={item.picture} alt="My Image" width={200} height={200} />
                </div>
              </figure> */}
          <div className="card-body ">
            <h2 className="card-title text-[#0083db]">Robert Bruce</h2>
            <p className=" font-semibold">
              <span>02/07/2023</span> <span className="px-6">4.15 PM</span>{" "}
            </p>
            <p className="text-base text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Deserunt, iste libero reprehenderit quis sit ea ducimus beatae
              laudantium totam doloremque, eos, voluptatum distinctio voluptatem
              incidunt in. Omnis eum sapiente non!
            </p>
          </div>
        </div>
      </div>
    ),
    Members: (
      <div>
        <h2 className="font-bold text-2xl text-[#0083db] mx-10 mb-2">Members</h2>
        <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-center font-bold text-xl">
              <th>SL</th>
              <th>Profile</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {member.map((item, index) => (
          <tr className="text-center" key={index}>
            <td className="text-xl font-bold">
              {index+1}
            </td>
            <td>
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={item.image} alt="Avatar" />
                </div>
              </div>
            </td>
            <td>
              <div className="font-bold text-xl">{item.name}</div>
              <span className="badge badge-accent font-bold badge-md">
                {item.role}
              </span>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
      </div>
    ),
    Assignments: (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-[#0083db] mx-10">
            Assignment
          </h2>
          <div className="me-10">
            <button
              className="btn bg-[#0083db] text-white"
              onClick={() => window.my_modal_4.showModal()}
            >
              New Assignment
            </button>
            <dialog id="my_modal_4" className="modal">
              <form
                method="dialog"
                className="modal-box w-11/12 max-w-5xl"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="font-bold text-4xl text-[#0083db] text-center">
                  Assignment
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
                    <div className="form-control w-full space-y-3 shadow-2xl rounded-2xl p-5 mt-5">
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
                  <div className="space-y-2 shadow-2xl rounded-2xl p-5">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-xl font-bold">
                          Due
                        </span>
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        className="input input-bordered input-primary w-full"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">
                            Close submissions after due date
                          </span>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-xl font-bold">
                          Topic
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-primary w-full"
                        {...register("topic")}
                        name="topic"
                      />
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-xl font-bold">
                          <p>Marks: {rangeValue}</p>
                        </span>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max="100"
                        value={rangeValue}
                        className="range range-primary"
                        onChange={(event) =>
                          setRangeValue(Number(event.target.value))
                        }
                      />
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-xl font-bold">
                          For
                        </span>
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
                  </div>
                </div>
                <div className="modal-action">
                  <button className="btn bg-[#0083db] text-white" type="submit">
                    Assign
                  </button>
                  <button
                    className="btn bg-[#d83e26] text-white"
                    onClick={() => window.my_modal_4.close()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
        {oldassignment.map((item) => (
          <div
            key={item.course_id}
            className="card bg-base-100 my-5 shadow-2xl border-t-4 border-[#0083db]"
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <button className="btn bg-[#0083db] text-white w-1/5 font-bold">
                  Active
                </button>
                <div className="flex items-center gap-2">
                  <GiClockwork size="2em" color="#0083db" />
                  <h1 className="text-lg font-bold">20 days left</h1>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <h2 className="card-title text-[#0083db] text-2xl">
                  <MdOutlineSubject size="1.4em" />
                  {item.title}
                </h2>
                <div className="flex gap-2">
                  <MdDateRange size="1.3em" />
                  <p className=" font-semibold">
                    Last submission: {new Date(item.due_date).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <RiFileList2Line size="1.3em" />
                  <p className="text-base text-gray-600">{item.description}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button className="btn btn-outline btn-info text-lg font-bold">
                  View
                </button>
                <button className="btn btn-outline btn-error text-lg font-bold">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    Grades: "Grades content goes here",
    Resourses: "Resources content goes here",
  };
  return (
    <div className="pt-32 w-3/4 mx-auto mb-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="border-4 border-[#0083db] p-5 rounded-lg">
          <div className="w-80 h-80 relative text-center">
            <Image
              className="rounded-lg w-full h-full object-cover border border-[#0083db]"
              src={"https://i.ibb.co/hg4p7QB/php.png"}
              width={600}
              height={600}
              alt="user photo"
            />
          </div>
          <div className="pb-4 pt-2">
            <h3 className="text-4xl text-[#0083db] font-semibold">
              Web Development with PHP
            </h3>
            <h5 className="font-semibold text-2xl">Jane Doe</h5>
          </div>
          <div className="">
            {categories.map((category, index) => (
              <Link
                href="#"
                key={index}
                className={`font-semibold text-xl mb-2 flex flex-col ${
                  tabIndex === index
                    ? "tab-active text-[#0083db] pl-2 border-l-2 border-[#0083db]"
                    : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
            <p className="text-red-600 cursor-pointer font-semibold text-xl">
              Delete this class
            </p>
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