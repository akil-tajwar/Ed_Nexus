'use client'
import Layout from "@/component/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

const Blogs = ({ params }) => {

	const [blogs, setBlogs] = useState([]);
	const blogsId = params.id;

	const onSubmitBlog = async (data) => {
		const { image, title, author, content, date } = data;
		const newBlog = {
			blogs_id: blogsId,
			image,
			title,
			author,
			content,
			date,
			likes: 0,      // Initialize likes to 0
			dislikes: 0,   // Initialize dislikes to 0
		};

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
			}
			else {
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
	};
	useEffect(() => {
		fetch('http://localhost:3000/api/blogs')
			.then(res => res.json())
			.then(data => setBlogs(data))
			.catch(error => console.log(error))
	}, []);

	const toggleLike = (blogId) => {
		setBlogs(prevBlogs => prevBlogs.map(blog => {
			if (blog._id === blogId) {
				if (!blog.liked) {
					return {
						...blog,
						likes: blog.likes + 1,
						liked: true,
					};
				}
				else {
					return {
						...blog,
						likes: blog.likes - 1,
						liked: false,
					};
				}
			}
			return blog;
		}));
	};

	const toggleDislike = (blogId) => {
		setBlogs(prevBlogs => prevBlogs.map(blog => {
			if (blog._id === blogId) {
				if (!blog.disliked) {
					return {
						...blog,
						dislikes: blog.dislikes + 1,
						disliked: true,
					};
				}
				else {
					return {
						...blog,
						dislikes: blog.dislikes - 1,
						disliked: false,
					};
				}
			}
			return blog;
		}));
	};

	return (
		<div className="py-32 lg:w-3/4 w-11/12 mx-auto">
			<div className="text-end mb-10">
				<button onClick={() => window.my_modal_5.showModal()} className="px-3 py-2 bg-[#0083db] rounded font-semibold text-white">Add Blogs</button>
				<dialog id="my_modal_5" className="modal">
					<form method="dialog" className="modal-box w-11/12 max-w-5xl">
						<textarea className="w-full rounded-lg" name="" id="" cols="30" rows="10"></textarea>
						<div className="modal-action">
							<button className="btn bg-[#0083db] text-white" type="submit">
								Post
							</button>
							<button className="btn bg-[#d83e26] text-white" onClick={() => window.my_modal_5.close()} >
								Cancel
							</button>
						</div>
					</form>
				</dialog>
			</div>
			<div className="grid grid-cols-3 w-fit gap-5">
				{
					blogs.map(blog => (
						<div className="s-color w-fit p-5 rounded-lg" key={blog.blogs_id}>
							<div className="relative w-full h-56">
								<img className="h-full w-full object-cover rounded-t-lg" src={blog.image} alt="" />
							</div>
							<h1 className="font-bold text-[#0083db] text-3xl pt-3">{blog.title}</h1>
							<p className="font-semibold text-xl pt-1">{blog.author}</p>
							<div className="py-4">
								<span>{blog.content.slice(0, 120)} . . . </span>
								<Link href={`/blogs/${blog._id}`} item={blog} key={blog._id}><button className="text-[#0083db]">see more</button></Link>
							</div>
							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<button onClick={() => toggleLike(blog._id)}>
										{
											blog.liked ? <AiFillLike className="text-2xl text-[#0083db]" /> : <AiOutlineLike className="text-2xl text-[#0083db]" />
										}
									</button>
									<p>{blog.likes}</p>
								</div>
								<div className="flex items-center gap-2">
									<button onClick={() => toggleDislike(blog._id)}>
										{
											blog.disliked ? <AiFillDislike className="text-2xl text-[#0083db]" /> : <AiOutlineDislike className="text-2xl text-[#0083db]" />
										}
									</button>
									<p>{blog.dislikes}</p>
								</div>
								<div className="flex items-center gap-2">
									<div className="flex items-center gap-2">
										<button onClick={() => window.my_modal_4.showModal()}>
											{
												<BiCommentDetail className="text-2xl text-[#0083db]" />
											}
										</button>
										<dialog id="my_modal_4" className="modal">
											<form method="dialog" className="modal-box w-11/12 max-w-5xl">
												<textarea className="w-full rounded-lg" name="" id="" cols="30" rows="10"></textarea>
												<div className="modal-action">
													<button className="btn bg-[#0083db] text-white" type="submit">
														Post
													</button>
													<button className="btn bg-[#d83e26] text-white" onClick={() => window.my_modal_4.close()} >
														Cancel
													</button>
												</div>
											</form>
										</dialog>
										<p>0</p>
									</div>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Blogs;
