"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserGraduate } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import Themes from "../../Themes/Themes";
import LogOut from "@/Components/auth/LogOut";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import Image from "next/image";
import CountUp from "react-countup";

const NavMenu = () => {
  const { data: session } = useSession();
  const [notification, setNotification] = useState([]);
  const pathNames = usePathname();
  const [click, setClick] = useState(false);
  // console.log('Current path:', pathNames);

  const hideNavbarPatterns = [/^\/login$/, /^\/signUp$/, /^\/Userlist$/, /^\/CouseDetails$/, /^\/admin$/, /^\/students$/, /^\/chat$/, /^\/dashboard$/, /^\/userContact$/, /^\/admindashboard$/, /^\/courses\/\w+$/, /^\/video$/];
  const shouldHideNavbar = hideNavbarPatterns.some((pattern) =>
    pattern.test(pathNames)
  );
  // console.log("shouldHideNavbar:", shouldHideNavbar);

  // For Getting Notication Data
  useEffect(() => {
    if (session) {
      const { user } = session;
      const loggedInUserEmail = user.email;

      const fetchNotification = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/notification/" + loggedInUserEmail
          );
          if (response.ok) {
            const data = await response.json();
            setNotification(data);
          } else {
            console.error("Failed to fetch Notification.");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      fetchNotification();
    }
  }, [session, notification]);

  function extractTimeFromISO(isoTimestamp) {
    const dateObj = new Date(isoTimestamp);
    const timeOffset = 6 * 60 * 60 * 1000;
    dateObj.setTime(dateObj.getTime() + timeOffset);
    const hours = dateObj.getUTCHours().toString().padStart(2, "0");
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // console.log("notification", notification);
  const menu = (
    <ul className="lg:flex gap-10 lg:py-6 items-center lg:text-xl ">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/courses">Courses</Link>
      </li>
      <li>
        <Link href="/blogs">Blogs</Link>
      </li>
      {session && (
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
      )}
      {session && (
        <li>
          <Link href="/chat">Chat</Link>
        </li>
      )}
    </ul>
  );
  return (
    <div>
      {!shouldHideNavbar ? (
        <div className="navbar lg:w-3/4 w-11/12 mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {menu}
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl md:text-4xl text-[#0083db]">
              ED_NEXUS
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">{menu}</div>
          <div className="navbar-end gap-1">
            <Themes />
            <div className="dropdown dropdown-bottom dropdown-end">
              <div>
                <button
                  tabIndex={0}
                  className="btn btn-circle  bg-[#0083db] m-1 indicator p-3"
                >
                  <MdNotificationsNone size="1.8em" color="white" />
                  <span className="indicator-item badge badge-secondary text-white">
                    <CountUp
                      delay={2}
                      end={notification.length}
                      className="text-white"
                    />
                  </span>
                </button>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] card card-compact w-64 lg:w-[350px] p-2 shadow bg-white text-primary-content"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h1 className="text-black">Notification</h1>
                    {/* <h1 className="text-accent">Clear All</h1> */}
                  </div>
                  <div className="flex flex-row items-center border-2 whitespace-nowrap"></div>
                  <div className="overflow-x-auto h-52">
                    {notification.map((item) => (
                      <>
                        <div
                          key={item._id}
                          className="flex items-center gap-3 px-2 py-4"
                        >
                          <div className="avatar">
                            <div className="w-10 rounded-full">
                              <Image src={item.ownerImage} alt="" fill={true} />
                            </div>
                          </div>
                          <div>
                            <p className="text-black">{item.message}</p>
                            <p>{extractTimeFromISO(item.createdAt)}</p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {session ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar bg-[#0083db] mr-3"
                >
                  <div className="w-10 rounded-full">
                    <FaUserGraduate className="flex justify-center items-center text-white text-xl ml-[10px] mt-[10px]" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <div>
                      <div className="flex items-center gap-2">
                        <CgProfile className="text-lg" />
                        <Link href="/profile" className="justify-between">
                          Profile
                        </Link>
                      </div>
                      <div className="badge bg-[#0083db] text-white">New</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="flex items-center gap-2">
                        <FiSettings className="text-lg" />
                        <Link href="/settings" className="justify-between">
                          Settings
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="flex items-center gap-2">
                        <FiLogOut className="text-lg" />
                        <LogOut />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="">
                <Link href="/login">
                  <button className="text-white lg:text-xl bg-[#0083db] w-24 py-1 border-2 border-[#0083db] rounded-md font-semibold">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavMenu;
