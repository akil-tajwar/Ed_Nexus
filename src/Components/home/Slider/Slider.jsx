"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import person from "../../../assets/images/person.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import ReactStars from "react-rating-stars-component";
import Rating from 'react-rating';
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';

import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Slider = () => {
	const [users, setUser] = useState([]);

	useEffect(() => {
		fetch('review.json')
			.then(res => res.json())
			.then(data => setUser(data))
	}, [])

	return (
		<div className=" relative -z-50">
			<h1 className="text-center text-[#0083db] font-semibold text-4xl my-2">
				Insights from Our Users
			</h1>
			<p className="text-center font-seminbold my-4">
				Hear from global users on their Ed Nexus experience. From students to
				educators, the <br /> verdict is unanimous: Ed Nexus stands as an
				essential instrument for contemporary education.
			</p>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper mb-20"
			>
				{
					users.map(user => <div key={user._id}>
						<SwiperSlide>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
								<div className="text-center s-color py-5 px-3 space-y-2 rounded-2xl">
									<div className="w-24 h-24 relative mx-auto rounded-full text-center">
										<Image className="rounded-full h-full w-full object-cover border-4 border-[#0083db] text-center" src="https://i.ibb.co/2v8qVbc/photo-1592009309602-1dde752490ae.jpg" alt="" width={96} height={96} />
									</div>
									<h1 className="text-[#0083db] text-2xl font-semibold">{user.name1}</h1>
									<div className='flex-grow-1 align-items-center' >
										<Rating
											placeholderRating={user.rating}
											readonly

											emptySymbol={<FaRegStar></FaRegStar>}
											placeholderSymbol={<FaStar className='text-warning'></FaStar>}
											fullSymbol={<FaStar></FaStar>}>

										</Rating>

									</div >

									<p>
										{user.review}
									</p>
								</div>
								<div className="text-center s-color py-5 px-3 space-y-2 rounded-2xl">
									<div className="w-24 h-24 relative mx-auto rounded-full text-center">
										<Image className="rounded-full h-full w-full object-cover border-4 border-[#0083db] text-center" src="https://i.ibb.co/2v8qVbc/photo-1592009309602-1dde752490ae.jpg" alt="" width={96} height={96} />
									</div>
									<h1 className="text-[#0083db] text-2xl font-semibold">{user.name2}</h1>
									<div className='flex-grow-1 align-items-center' >
										<Rating
											placeholderRating={user.rating1}
											readonly

											emptySymbol={<FaRegStar></FaRegStar>}
											placeholderSymbol={<FaStar className='text-warning'></FaStar>}
											fullSymbol={<FaStar></FaStar>}>

										</Rating>

									</div >
									<p>
										{user.review1}
									</p>
								</div>
								<div className="text-center s-color py-5 px-3 space-y-2 rounded-2xl">
									<div className="w-24 h-24 relative mx-auto rounded-full text-center">
										<Image className="rounded-full h-full w-full object-cover border-4 border-[#0083db] text-center" src="https://i.ibb.co/2v8qVbc/photo-1592009309602-1dde752490ae.jpg" alt="" width={96} height={96} />
									</div>
									<h1 className="text-[#0083db] text-2xl font-semibold">{user.name3}</h1>
									<div className='flex-grow-1 align-items-center' >
										<Rating
											placeholderRating={user.rating2}
											readonly

											emptySymbol={<FaRegStar></FaRegStar>}
											placeholderSymbol={<FaStar className='text-warning'></FaStar>}
											fullSymbol={<FaStar></FaStar>}>
										</Rating>
									</div >
									<p>
										{user.review2}
									</p>
								</div>
							</div>
						</SwiperSlide>
					</div>)
				}

			</Swiper>
		</div>
	);
};

export default Slider;
