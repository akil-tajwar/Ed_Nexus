import React from "react";

const ContentBanner = () => {
	return (
		<div className="space-y-3">
			<div className="top-10">
				<h1 className="text-4xl md:text-6xl font-semibold">
					Where Teaching <br /> and Learning
					<div className="text-[#0083db]"> Unite for Growth</div>
				</h1>
				<p className="py-5">
					Nurturing knowledge and fostering connections in a dynamic realm of
					collaborative education. Join us to shape the future of learning
					together
				</p>
				{/* <button className="text-white bg-[#0083db] btn-md rounded-md font-semibold text-xl">
					Get Started
				</button> */}
			</div>
		</div>
	);
};

export default ContentBanner;
