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
import { AiOutlineSend } from "react-icons/ai";
import { TbNotebook } from "react-icons/tb";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

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
    reset,
  } = useForm();

  const [oldassignment, setOldssignment] = useState([]);
  const [member, setMember] = useState([]);
  const [notice, setNotice] = useState([]);
  const [resources, setResources] = useState([]);
  const {session} = useSession()

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
  const onSubmitNotice = async (data) => {
    const { title, description} = data;
    const newNotice = {
      course_id: "",
      title,
      description,
      createdAt: currentDateBD.toISOString(),
      updatedAt: currentDateBD.toISOString()
    };

    try {
      const result = await fetch("http://localhost:3000/api/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotice),
      });

      if (result.ok) {
        const responseData = await result.json();
        setNotice((prevNotice) => [...prevNotice, responseData]);
        console.log("Notice added:", responseData);
        toast.success("Notice Added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
        window.my_modal_5.close();
      } else {
        toast.error("Failed to add Notice.!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("An error occurred!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // For Posting Assignment Data
  const onSubmitAssignment = async (data) => {
    const { title, description, due_date, For, topic, attachments } = data;
    const newAssignment = {
      course_id: "",
      title,
      description,
      due_date: startDate,
      attachments: [
        {
          url: attachments
        }
      ],
      submissions: [
        {
          url: ""
        }
      ],
      topic: topic,
      total_mark: rangeValue,
      createdAt: currentDateBD.toISOString(),
      updatedAt: currentDateBD.toISOString()
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
        setOldssignment((prevNotice) => [...prevNotice, responseData]);
        console.log("Assignment added:", responseData);
        toast.success("Assignment Added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        reset();
        window.my_modal_5.close();
      } else {
        console.error("Failed to add assignment.");
        toast.error("Failed to add assignment!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // For Posting Resources Data
  const onSubmitResources = async (data) => {
    const { title, description, attachments } = data;
    const newResources = {
      course_id: "",
      title,
      description,
      attachments: [
        {
          url: attachments,
        },
      ],
      createdAt: currentDateBD.toISOString(),
      updatedAt: currentDateBD.toISOString()
    };

    try {
      const result = await fetch("http://localhost:3000/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResources),
      });

      if (result.ok) {
        const responseData = await result.json();
        setResources((prevResources) => [...prevResources, responseData]);
        console.log("Resources added:", responseData);
        toast.success("Resources Added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        reset();
        window.my_modal_5.close();
      } else {
        console.error("Failed to add Resources.");
        toast.error("Failed to add Resources!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // For Getting Assignment Data
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
  // For Getting Member Data
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
  // For Getting Notice Data
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notice");
        if (response.ok) {
          const data = await response.json();
          setNotice(data);
        } else {
          console.error("Failed to fetch assignments.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchNotice();
  }, []);
  // For Getting Resources Data
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/resources");
        if (response.ok) {
          const data = await response.json();
          setResources(data);
        } else {
          console.error("Failed to fetch assignments.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchResource();
  }, []);

  const categoryContent = {
    Notice: (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-[#0083db] mx-10">Notices</h2>
          <div className="me-10">
            <button
              className="btn bg-[#0083db] text-white"
              onClick={() => window.my_modal_5.showModal()}
            >
              New Notice
            </button>
            <dialog id="my_modal_5" className="modal">
              <form
                method="dialog"
                className="modal-box w-11/12 max-w-5xl"
                onSubmit={handleSubmit(onSubmitNotice)}
              >
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
        </div>
        {notice.map((item, index) => (
          <div
            key={item.course_id}
            className="card bg-base-100 my-5 shadow-2xl border-t-4 border-[#0083db]"
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src="https://i.ibb.co/2v8qVbc/photo-1592009309602-1dde752490ae.jpg" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Jane Doe</h1>
                  <p>{extractTimeFromISO(item.createdAt)}</p>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <h2 className="card-title text-[#0083db] text-2xl font-bold">
                  <MdOutlineSubject size="1.4em" />
                  {item.title}
                </h2>
                <div className="text-base text-gray-600 ">
                  <h1>{item.description}</h1>
                </div>
              </div>
              <div className="flex gap-3 mt-5 items-center">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://i.ibb.co/Pgrgt4S/clf47wwin001nmh08aqvomr5k-1.jpg" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Comment here"
                  className="input input-bordered input-info w-full"
                />
                <AiOutlineSend size="2.5em" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    Members: (
      <div>
        <h2 className="font-bold text-2xl text-[#0083db] mx-10 mb-2">
          Members
        </h2>
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
                  <td className="text-xl font-bold">{index + 1}</td>
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
              onClick={() => window.my_modal_5.showModal()}
            >
              New Assignment
            </button>
            <dialog id="my_modal_5" className="modal">
              <form
                method="dialog"
                className="modal-box w-11/12 max-w-5xl"
                onSubmit={handleSubmit(onSubmitAssignment)}
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
                    onClick={() => window.my_modal_5.close()}
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
    Resourses: (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-[#0083db] mx-10">Resourses</h2>
          <div className="me-10">
            <button
              className="btn bg-[#0083db] text-white"
              onClick={() => window.my_modal_5.showModal()}
            >
              New Resourses
            </button>
            <dialog id="my_modal_5" className="modal">
              <form
                method="dialog"
                className="modal-box w-11/12 max-w-5xl"
                onSubmit={handleSubmit(onSubmitResources)}
              >
                <h2 className="font-bold text-4xl text-[#0083db] text-center">
                  Resourses
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
                    <div className="form-control w-full space-y-3 shadow-2xl rounded-2xl p-5">
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
        </div>
        {resources.map((item) => (
          <div
            key={item.course_id}
            className="card bg-base-100 my-5 shadow-2xl border-t-4 border-[#0083db]"
          >
            <div className="collapse bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title flex items-center justify-between">
                <div className="flex items-center text-xl font-medium ">
                  <TbNotebook size="1.5em" color="#0083db"/> {item.title}
                </div>
                <h1>Posted {extractTimeFromISO(item.createdAt)}</h1>
              </div>
              <div className="collapse-content border-t-8 pt-2 space-y-3">
                <p className="text-xl font-bold">{item.description}</p>
                {item.attachments[0].url && (
                  <h1 className="text-base font-bold">
                    Link:{" "}
                    <a className="link link-secondary">
                      {item.attachments[0].url}
                    </a>
                  </h1>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
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
