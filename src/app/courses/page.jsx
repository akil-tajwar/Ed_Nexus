"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Lottie from "react-lottie";
import classroomAnimate from "../../../public/classroom.json";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi";
import { GiTeacher } from "react-icons/gi";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "@/apiHook/imageUpload";

const Courses = () => {
  const [courseName, setCourseName] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const { data: session } = useSession();
  const [courseData, setCourseData] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  // Create Class and Create unique chat for course
  const handleSubmit = async (e) => {
    if (!courseName || !password || !picture) {
      // Check if required fields are empty
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill out all required fields.",
      });
      return; // Don't proceed with the API call if validation fails
    }

    if (session) {
      const { user } = session;
      const loggedInUserEmail = user.email;
      const loggedInUserName = user.name;
      const loggedInUserImage = user.image;
      const apiUrl = "https://api.chatengine.io/chats/";

      try {
        // Create Chat group for the course
        const chatResponse = await axios.put(
          apiUrl,
          {
            username: [loggedInUserName],
            title: courseName,
            is_direct_chat: "true",
          },
          {
            headers: {
              "Project-ID": "27a5ab30-23cb-4d38-9933-71b24af69399",
              "User-Name": loggedInUserName,
              "User-Secret": loggedInUserEmail,
            },
          }
        );

        const userData = chatResponse.data;
        console.log(userData);
        const data = new FormData();
        data.append("file", picture)
        const imageUploadResponse = await imageUpload(data);
        if (imageUploadResponse.success) {
          const formData = {
            courseName,
            picture: imageUploadResponse.data.display_url,
            password,
            chatID: userData.id,
            chatAccessKey: userData.access_key,
            members: [
              {
                email: loggedInUserEmail,
                role: "owner",
                username: loggedInUserName,
                image: loggedInUserImage,
              },
            ],
            ownerName: loggedInUserName,
            ownerEmail: loggedInUserEmail,
          };
          // Send formData to backend API for storage in MongoDB
          const res = await fetch("/api/courses/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (res.ok) {
            // Course creation was successful
            Swal.fire({
              icon: "success",
              title: "Class Created Successfully",
              text: "Your class has been created successfully!",
            });
          } else {
            // Course creation failed
            Swal.fire({
              icon: "error",
              title: "Class Creation Failed",
              text: "Failed to create the class. Please try again later.",
            });
          }
        }
      } catch (error) {
        // An error occurred while making the API call
        console.error("Error creating class:", error);
        Swal.fire({
          icon: "error",
          title: "Class Creation Failed",
          text: "An error occurred while creating the class. Please try again later.",
        });
      }
    }
  };
  // Fetch courses based on user's email
  useEffect(() => {
    async function fetchCourses() {
      try {
        if (session) {
          const loggedInUserEmail = session.user.email;
          const response = await fetch("/api/courses/create");
          const data = await response.json();
          const filteredCourses = data.courses.filter((item) =>
            item.members.some((member) => member.email === loggedInUserEmail)
          );
          setCourseData(filteredCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [session]);

  // joining a class
  const handleJoin = async (courseId, password) => {
    if (session) {
      const loggedInUserEmail = session.user.email;
      const loggedInUserName = session.user.name;
      const loggedInUserImage = session.user.image;
      const formData = {
        course_id: courseId,
        password,
        email: loggedInUserEmail,
        role: "student",
        username: loggedInUserName,
        image: loggedInUserImage, // Assuming students are joining
      };

      const res = await fetch("/api/courses/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Class Joined Successfully",
          text: "You have successfully joined the class!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Class Joining Failed",
          text: "Failed to join the class. Please check the course ID and password.",
        });
      }
      try {
        const res = await fetch(
          "http://localhost:3000/api/courses/" + courseId,
          {
            method: "GET",
          }
        );

        if (res.ok) {
          const data = await res.json();
          const chatID = data.chatID;
          const ownerName = data.ownerName;
          const ownerEmail = data.ownerEmail;
          console.log(data);
          const chatMember = await axios.post(
            `https://api.chatengine.io/chats/${chatID}/people/`,
            {
              username: loggedInUserName,
            },
            {
              headers: {
                "Project-ID": "27a5ab30-23cb-4d38-9933-71b24af69399",
                "User-Name": ownerName,
                "User-Secret": ownerEmail,
              },
            }
          );
          const userData = chatMember.data;
          console.log(userData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error joining class:", error);
      }
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: classroomAnimate,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="text-justify px-7 w-full lg:w-3/4 mx-auto mb-10 pt-32">
      <div className="flex justify-end">
        <div className="mr-5">
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn bg-[#0083db] text-white"
            onClick={() => window.my_modal_5.showModal()}
          >
            Create Class
          </button>
          <dialog id="my_modal_5" className="modal sm:modal-middle">
            <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Name</span>
                  </label>
                  <input
                    type="text"
                    name="course name"
                    placeholder="Course Name"
                    className="input input-bordered"
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Picture</span>
                  </label>
                  <input
                    type="file"
                    name="picture"
                    placeholder="Course picture"
                    className="input input-bordered"
                    onChange={(e) => setPicture(e.target.files[0])}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-control mt-2">
                  <form method="dialog">
                    <button
                      className="btn bg-blue-600 text-white hover:bg-blue-700 px-[110px]"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Create Class
                    </button>
                  </form>
                  <form method="dialog">
                    <button className="btn bg-red-600 text-white hover:bg-red-700 px-[139px]">
                      Close
                    </button>
                  </form>
                  {/* <button method="dialog" className="btn bg-red-600 text-white hover:bg-red-700">
                    Close
                  </button> */}
                </div>
              </div>
            </form>
          </dialog>
        </div>
        <div>
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn bg-[#0083db] text-white"
            onClick={() => window.my_modal_6.showModal()}
          >
            Join Class
          </button>
          <dialog id="my_modal_6" className="modal sm:modal-middle">
            <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course ID</span>
                  </label>
                  <input
                    type="text"
                    name="course id"
                    placeholder="Course ID"
                    className="input input-bordered"
                    onChange={(e) => setCourseId(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e) => setJoinPassword(e.target.value)}
                  />
                </div>
                <div className="form-control mt-2">
                  <form method="dialog">
                    <button
                      className="btn bg-blue-600 text-white hover:bg-blue-700 px-[121px]"
                      type="submit"
                      onClick={() => handleJoin(courseId, joinPassword)}
                    >
                      Join Class
                    </button>
                  </form>
                  <form method="dialog">
                    <button className="btn bg-red-600 text-white hover:bg-red-700 px-[139px]">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </form>
          </dialog>
        </div>
      </div>

      {courseData.length === 0 ? (
        // Showing picture when there is no course data
        <div className="w-full flex flex-col items-center justify-center">
          <Lottie
            className="mx-auto my-5"
            options={defaultOptions}
            height={400}
            width={400}
          />
          <div>
            <p className="mx-auto text-xl font-semibold my-3">
              You have no classes Yet !!!
            </p>
          </div>
        </div>
      ) : (
        // Show courses when there is course data
        <div>
          <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 my-4">
            {courseData.map((item) => (
              <Link href={`/courses/${item?._id}`} item={item} key={item._id}>
                <div className="card card-compact w-96 h-96 bg-base-100 shadow-2xl">
                  <figure className="h-[72%]">
                    <img src={item.picture} />
                  </figure>
                  <div className="avatar-group -space-x-7 absolute top-[50%] right-3">
                    {item.members.slice(0, 4).map((member, index) => (
                      <div className="avatar" key={index}>
                        <div className="w-12">
                          <img src={member.image} />
                        </div>
                      </div>
                    ))}
                    <div className="avatar placeholder">
                      <div className="w-12 bg-neutral-focus text-neutral-content">
                        <span>+{item.members.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h2 className="text-2xl font-bold">{item.courseName}</h2>
                    <div className="flex gap-3">
                      <GiTeacher size="1.6em" />
                      <h2 className="text-lg font-bold">{item.ownerName}</h2>
                    </div>
                    {/* <div className="flex items-center gap-2">
                    <h1 className="text-lg font-medium">4.0(75 reviews)</h1>
                    <div className="flex items-center">
                      <AiFillStar size="1.6em" color="#FDCC0D" />
                      <AiFillStar size="1.6em" color="#FDCC0D" />
                      <AiFillStar size="1.6em" color="#FDCC0D" />
                      <AiFillStar size="1.6em" color="#FDCC0D" />
                      <AiOutlineStar size="1.6em" />
                    </div>
                  </div> */}
                    <div className="card-actions justify-between mt-6">
                      <div className="flex items-center gap-2">
                        <HiOutlineUserGroup size="1.9em" />
                        <h1 className="text-lg">
                          {item.members.length} people
                        </h1>
                      </div>
                      {/* <div className="flex items-center gap-2">
                      <HiOutlineBookOpen size="1.9em" />
                      <h1 className="text-lg">3 lessons</h1>
                    </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
