'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Blogs = ({ params }) => {

	const [blogs, setBlogs] = useState([]);
	const blogsId = params.id;

	const onSubmitBlog = async (data) => {
		const { blogs_id, image, title, author, content, date } = data;
		const newBlog = {
			blogs_id: blogsId,
			image,
			title,
			author,
			content,
			date,
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
	};
	useEffect(() => {
		// const fetchBlogs = async () => {
		// 	try {
		// 		const response = await fetch("http://localhost:3000/api/blogs");
		// 		if (response.ok) {
		// 			const data = await response.json();
		// 			// console.log(data);
		// 			const findBlogs = data.map((item) => item.blogs_id === blogsId);
		// 			setBlogs(findBlogs);
		// 			console.log(findBlogs);
		// 		} else {
		// 			console.error("Failed to fetch blogs.");
		// 		}
		// 	} catch (error) {
		// 		console.error("An error occurred:", error);
		// 	} finally {
		// 		setIsLoading(false);
		// 	}
		// };
		// fetchBlogs();
		fetch('http://localhost:3000/api/blogs')
			.then(res => res.json())
			.then(data => setBlogs(data))
			.catch(error => console.log(error))
	}, []);
	return (
		<div className="py-32 lg:w-3/4 w-11/12 mx-auto">
			<div className="text-end">
				<button className="px-3 py-2 bg-[#0083db] rounded font-semibold text-white">Add Blogs</button>
			</div>

			{
				blogs.map(blog => <div key={blog.blogs_id}>
					<h1>{blog.title}</h1>
				</div>)
			}

		</div>

	);
};

export default Blogs;
