"use client";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
// import contactUs from '../../../assets/LottieAnimation/contactUs'
import contactUs from "../../assets/LottieAnimation/contactUs.json"
import { BsSend } from 'react-icons/bs';
import { toast } from "react-toastify";
import Layout from "@/component/Layout";

const Contacts = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const currentDateLocal = new Date();
    const timeOffset = 6 * 60 * 60 * 1000;
    const currentDateBD = new Date(currentDateLocal.getTime() + timeOffset);

    const onSubmitContact = async (data) => {
        const { name, email, description } = data;
        const newContact = {
            name,
            email,
            description,
            createdAt: currentDateBD.toISOString(),
            updatedAt: currentDateBD.toISOString(),
        };

        try {
            const result = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newContact),
            });
            console.log(result)
            if (result.ok) {
                const responseData = await result.json();
                console.log("Message added:", responseData);
                toast.success("Message Send!", {
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
            } else {
                toast.error("Failed to Send Message.!", {
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

    return (
        <Layout >
            <div style={{ height: "500px" }} className="grid grid-cols-1 mt-9 lg:grid-cols-2   border-t-8 border-b-8 border-[#0083db] rounded-2xl">
                <div className="p-10">
                    <h1 className="text-4xl font-semibold text-[#0083db] mb-7">Contact us</h1>
                    <form onSubmit={handleSubmit(onSubmitContact)}>
                        <div className="space-y-6">
                            <input
                                {...register("name")}
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full lg:w-11/12 font-semibold border-2 border-[#EDEFFA]"
                            />
                            <input
                                {...register("email")}
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full lg:w-11/12 font-semibold border-2 border-[#EDEFFA]"
                            />
                            <textarea
                                {...register("description")}
                                name="description"
                                className="textarea textarea-bordered w-full lg:w-11/12 font-semibold border-2 border-[#EDEFFA]"
                                placeholder="Message"
                            ></textarea>
                        </div>
                        <button className="btn btn-outline mt-3 lg:w-11/12" type="submit">
                            <div className="flex items-center gap-2">
                                <span> Send Message</span>
                                <BsSend size="1.4em" />
                            </div>
                        </button>
                    </form>
                </div>
                <div className="w-full">
                    {<Lottie animationData={contactUs} loop={true}></Lottie>}
                </div>
            </div>
        </Layout>
    );
};

export default Contacts;
