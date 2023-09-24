"use client";
import Layout from "@/component/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
  AiOutlineSend,
} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { toast } from "react-toastify";
import { sendNotification } from "../Notification/notification";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { data: session } = useSession();
  const [comment, setComment] = useState(null);
  const [showState, setShowState] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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

  const currentDateLocal = new Date();
  const timeOffset = 6 * 60 * 60 * 1000;
  const currentDateBD = new Date(currentDateLocal.getTime() + timeOffset);

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour format with AM/PM
    };
    return date.toLocaleString("en-US", options);
  };
  //   Blog Post
  const onSubmitBlog = async (data) => {
    const { title, content } = data;
    if (session) {
      const { user } = session;
      const loggedInUserName = user.name;
      const loggedInUserImage = user.image;
      const newBlog = {
        image: "https://i.ibb.co/F7QGyg5/pexels-pixabay-262508.jpg",
        title: title,
        author: loggedInUserName,
        authorImage: loggedInUserImage,
        content: content,
        createdAt: currentDateBD.toISOString(),
        updatedAt: currentDateBD.toISOString(),
        like: [],
        dislike: [],
        comment: [],
      };
      //   console.log(newBlog);

      try {
        const result = await fetch("http://localhost:3000/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBlog),
        });

        if (result.ok) {
          const responseData = await result.json();
          setBlogs((prevBlogs) => [...prevBlogs, responseData]);
          console.log("Blog is added:", responseData);
          // Send Notification
          users.map((member) => {
            sendNotification(
              member.email,
              member.image,
              `${loggedInUserName} posted a new Blog: ${title}`,
              currentDateBD.toISOString()
            );
          });
          toast.success("Blog is Added!", {
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
          toast.error("Failed to add blog.!", {
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
    }
  };
  //   comment send
  const sendComment = async (blogId) => {
    if (session) {
      console.log(blogId);
      const { user } = session;
      const loggedInUserName = user.name;
      const loggedInUserImage = user.image;
      const loggedInUserEmail = user.email;
      const newComment = {
        userName: loggedInUserName,
        userImage: loggedInUserImage,
        userEmail: loggedInUserEmail,
        comment: comment,
        createdAt: currentDateBD.toISOString(),
        updatedAt: currentDateBD.toISOString(),
      };
      try {
        const res = await fetch("http://localhost:3000/api/blogs/" + blogId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Commment Posted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSelectedBlog((prevBlog) => ({
            ...prevBlog,
            comment: [...prevBlog.comment, data.comment], // Assuming the API response has a "comment" field
          }));
          setComment(null);
        } else {
          toast.error("Failed to Comment in blog.!", {
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
    }
  };

  // Blog Get
  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Add liked and disliked properties to each blog
        const blogsWithLikesAndDislikes = data.map((blog) => ({
          ...blog,
          liked: false, // Initialize liked as false
          disliked: false, // Initialize disliked as false
        }));
        setBlogs(blogsWithLikesAndDislikes);
      })
      .catch((error) => console.log(error));
  }, [blogs, selectedBlog]);

  const openCommentModal = async (blog) => {
    setSelectedBlog(blog);
    setShowState(true);
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
    }
  };

  const toggleLike = async (blogID) => {
    if (session) {
      const { user } = session;
      const loggedInUserEmail = user.email;
      try {
        const response = await fetch(
          "http://localhost:3000/api/blogLike/" + blogID,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ loggedInUserEmail }),
          }
        );

        if (response.status === 200) {
          // Liked the blog successfully, update the UI to show it's liked
          const updatedBlogs = blogs.map((blog) =>
            blog._id === blogID
              ? { ...blog, liked: !blog.liked, disliked: false }
              : blog
          );
          setBlogs(updatedBlogs);
        }
      } catch (error) {
        console.error("Error liking the blog", error);
      }
    }
  };

  const toggleDislike = async (blogID) => {
    if (session) {
      const { user } = session;
      const loggedInUserEmail = user.email;
      try {
        const response = await fetch(
          "http://localhost:3000/api/blogDislike/" + blogID,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ loggedInUserEmail }),
          }
        );

        if (response.status === 200) {
          // Disliked the blog successfully, update the UI to show it's disliked
          const updatedBlogs = blogs.map((blog) =>
            blog._id === blogID
              ? { ...blog, disliked: !blog.disliked, liked: false }
              : blog
          );
          setBlogs(updatedBlogs);
        }
      } catch (error) {
        console.error("Error disliking the blog", error);
      }
    }
  };
  return (
    <div className="py-32 lg:w-3/4 w-11/12 mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="text-xl breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blogs" className="text-[#0083db] font-semibold">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => window.my_modal_5.showModal()}
          className="px-3 py-2 bg-[#0083db] rounded font-semibold text-white"
        >
          Add Blogs
        </button>
        <dialog id="my_modal_5" className="modal">
          <form
            method="dialog"
            onSubmit={handleSubmit(onSubmitBlog)}
            className="modal-box w-2/3 max-w-5xl"
          >
            <div className="mb-5">
              <p className="text-left">Blog Banner</p>
              <input className="w-full" type="file" />
            </div>
            <div className="mb-5">
              <p className="text-left">Blog Title</p>
              <input
                name="title"
                {...register("title", { required: true })}
                className="border w-full rounded-lg p-2"
                type="text"
              />
              {errors.name && (
                <span className="text-red-600">title is required</span>
              )}
            </div>
            <div>
              <p className="text-left">Blog Content</p>
              <textarea
                className="w-full rounded-lg border p-2"
                placeholder="Blog content here...."
                id=""
                cols="30"
                rows="10"
                {...register("content", { required: true })}
                name="content"
              ></textarea>
              {errors.name && (
                <span className="text-red-600">Content is required</span>
              )}
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-fit gap-5">
        {blogs.map((blog) => (
          <div key={blog._id} className="s-color relative p-5 rounded-lg">
            <div className="relative w-full h-56">
              {blog.image && (
                <Image
                  className="object-cover rounded-t-lg"
                  src={blog.image}
                  alt=""
                  fill={true}
                />
              )}
            </div>
            <h1 className="font-bold text-[#0083db] text-3xl pt-3">
              {blog.title}
            </h1>
            <p className="font-semibold text-xl pt-1">{blog.author}</p>
            <div className="pt-4 pb-[35px]">
              {typeof blog.content === "string" && (
                <span>{blog.content.slice(0, 90)} . . . </span>
              )}
              <Link href={`/blogs/${blog._id}`} item={blog} key={blog._id}>
                <button className="text-[#0083db]">see more</button>
              </Link>
            </div>
            <div className="absolute left-0 bottom-0 w-full mt-1">
              <div className="flex px-5 mb-5 justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleLike(blog._id)}>
                    {blog.liked ? (
                      <AiFillLike className="text-2xl text-[#0083db]" />
                    ) : (
                      <AiOutlineLike className="text-2xl text-[#0083db]" />
                    )}
                  </button>
                  <p>{blog.like.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleDislike(blog._id)}>
                    {blog.disliked ? (
                      <AiFillDislike className="text-2xl text-[#0083db]" />
                    ) : (
                      <AiOutlineDislike className="text-2xl text-[#0083db]" />
                    )}
                  </button>
                  <p>{blog.dislike.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openCommentModal(blog)}>
                      {<BiCommentDetail className="text-2xl text-[#0083db]" />}
                    </button>
                    <dialog id="my_modal_4" className="modal" show={showState}>
                      <div className="modal-box w-2/3 max-w-3xl space-y-3">
                        <div className="flex gap-3">
                          <div className="rounded">
                            <Image
                              src={session?.user?.image}
                              alt=""
                              width={50}
                              height={50}
                              className="rounded-xl"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-2xl"
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            onClick={() => sendComment(selectedBlog?._id)}
                          >
                            <AiOutlineSend
                              className="text-[#0083db] cursor-pointer"
                              size="2.5em"
                            />
                          </button>
                        </div>
                        <div className="my-2 font-semibold">
                          <p>{selectedBlog?.comment?.length}comments</p>
                        </div>
                        <div className="max-h-80 overflow-y-scroll">
                          {selectedBlog &&
                            selectedBlog?.comment?.map((item) => (
                              <>
                                {item?.userEmail === session?.user?.email ? (
                                  <>
                                    <div className="chat chat-end">
                                      <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                          <Image
                                            alt=""
                                            src={item?.userImage}
                                            fill={true}
                                            className="rounded-xl"
                                          />
                                        </div>
                                      </div>
                                      <div className="chat-header">
                                        {item?.userName}
                                        <time className="text-xs opacity-50 ml-1">
                                          {formatTime(item?.createdAt)}
                                        </time>
                                      </div>
                                      <div className="chat-bubble bg-[#0083db] text-white font-semibold">
                                        {item?.comment}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="chat chat-start">
                                      <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                          <Image
                                            alt=""
                                            src={item?.userImage}
                                            fill={true}
                                            className="rounded-xl"
                                          />
                                        </div>
                                      </div>
                                      <div className="chat-header">
                                        {item?.userName}
                                        <time className="text-xs opacity-50 ml-1">
                                          {formatTime(item?.createdAt)}
                                        </time>
                                      </div>
                                      <div className="chat-bubble bg-[#0083db] text-white font-semibold">
                                        {item?.comment}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ))}
                        </div>

                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn mt-10 btn-error text-white">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <p>{blog.comment.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
