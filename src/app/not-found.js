'use client'
import Lottie from "react-lottie";
import Error from "../../public/error.json"
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const notFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Error,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="w-full flex flex-col items-center justify-center pt-32">
            <Lottie
                className="mx-auto my-24"
                options={defaultOptions}
                height={400}
                width={400}
            />
            <div>
                <p className="w-40 mb-3">
                    <Link
                        href="/"
                        className="flex items-center mt-5 p-2 space-x-3 rounded-md  bg-[#0083db]"
                    >
                        {/* <button className="text-white lg:text-xl bg-[#0083db] w-full py-1 border-2 border-[#0083db] rounded-md font-semibold">
                            
                        </button> */}
                        <FaHome className="w-6 h-6 text-gray-100"></FaHome>
                        <span className="text-gray-100 text-base">Back to Home</span>
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default notFound;