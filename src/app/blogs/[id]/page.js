"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineSend,
} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { toast } from "react-toastify";

const BlogDetails = ({ params }) => {
  const [singleBlog, setSingleBlog] = useState([]);
  const { data: session } = useSession();
  const [comment, setComment] = useState(null);
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

  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        const blog = data.find((item) => item._id === params.id);
        const blogsWithLikesAndDislikes = {
          ...blog,
          liked: false, // Initialize liked as false
          disliked: false, // Initialize disliked as false
        };
        setSingleBlog(blogsWithLikesAndDislikes);
      })
      .catch((error) => console.log(error));
  }, [params.id, singleBlog]);
  // console.log(singleBlog);
  //   comment send
  const sendComment = async (blogId) => {
    if (session) {
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
            comment: [...prevBlog.comment, data.comment],
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
        // toast.error("An error occurred!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    }
  };
  const openCommentModal = (blog) => {
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
    <div className="pt-32 mb-20 lg:w-3/4 w-11/12 mx-auto ">
      <div>
        <div className="text-xl breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className="text-[#0083db] font-semibold">Details</li>
          </ul>
        </div>
        <h1 className="text-5xl border-l-4 border-[#0083db] pl-5 py-2 font-semibold">
          {singleBlog?.title}
        </h1>
        <div></div>
      </div>
      <div className="flex justify-between items-center pt-8 pb-5">
        <div className="flex gap-4">
          <div className="relative h-14 w-14">
            <Image
              className="w-full h-full rounded-full object-cover border-2 border-[#0083db]"
              src={singleBlog?.authorImage}
              alt=""
              fill={true}
            />
          </div>
          <div>
            <h5 className="text-xl font-semibold">{singleBlog?.author}</h5>
            <p>{formatTime(singleBlog?.createdAt)}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <button onClick={() => toggleLike(singleBlog?._id)}>
              {singleBlog?.liked ? (
                <AiFillLike className="text-2xl text-[#0083db]" />
              ) : (
                <AiOutlineLike className="text-2xl text-[#0083db]" />
              )}
            </button>
            <p>{singleBlog?.like?.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleDislike(singleBlog?._id)}>
              {singleBlog?.disliked ? (
                <AiFillDislike className="text-2xl text-[#0083db]" />
              ) : (
                <AiOutlineDislike className="text-2xl text-[#0083db]" />
              )}
            </button>
            <p>{singleBlog?.dislike?.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button onClick={() => openCommentModal()}>
                {<BiCommentDetail className="text-2xl text-[#0083db]" />}
              </button>
              <dialog id="my_modal_4" className="modal">
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
                    <button onClick={() => sendComment(singleBlog?._id)}>
                      <AiOutlineSend
                        className="text-[#0083db] cursor-pointer"
                        size="2.5em"
                      />
                    </button>
                  </div>
                  <div className="my-2 font-semibold">
                    <p>{singleBlog?.comment?.length}comments</p>
                  </div>
                  <div className="max-h-80 overflow-y-scroll">
                    {singleBlog?.comment?.map((item) => (
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
              <p>{singleBlog?.comment?.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative w-full h-96 pb-10">
          <Image
            className="h-full w-full object-cover rounded-lg"
            src={singleBlog?.image}
            alt=""
            fill={true}
          />
        </div>
        <div className="my-3">
          <p>{singleBlog?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
