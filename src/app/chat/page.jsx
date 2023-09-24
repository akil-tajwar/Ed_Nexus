"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useChatContext } from "../Context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./style.css";
import Link from "next/link";
import { TbMessageDots } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { BiBookBookmark } from "react-icons/bi";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

const AllChat = () => {
  const { value } = useChatContext();
  const { username, secret, email, setUsername, setSecret, setEmail } = value;
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const { user } = session;
      const loggedInUserEmail = user.email;
      const loggedInUserName = user.name;
      const loggedInUserImage = user.image;
      const avatar = user.image;
      setUsername(loggedInUserName);
      setSecret(loggedInUserEmail);
      setEmail(loggedInUserEmail);

      axios
        .put(
          "https://api.chatengine.io/users/",
          { username, secret, email },
          { headers: { "Private-Key": "801b8c88-0315-4106-9286-01cd910501e9" } }
        )
        .then((r) => {
          const userData = r.data;
          console.log("User Data:", userData);
        });
    }
  }, [session, username, secret, email, setUsername, setSecret, setEmail]);

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username === "" || secret === "" || email === "") {
      router.push("/chat");
    }
  });

  if (!showChat) return <div />;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <div className="lg:h-[100vh] h-full">
          <ChatEngine
            projectID="43644d8b-ebfa-461a-8fcc-fbbd80d16a42"
            userName={username}
            userSecret={secret}
            userEmail={email}
            renderNewMessageForm={() => <MessageFormSocial />}
            className="ce-wrapper"
          />
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        ></label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-20 min-h-full bg-base-200 text-base-content justify-evenly">
          {/* Sidebar content here */}
          <li>
            <Link href="/">
              <button className="text-[#0083db]">
                <AiOutlineHome size="1.8em" />
              </button>
            </Link>
          </li>
          <li>
            <button className="text-[#0083db] active">
              <TbMessageDots size="1.8em" />
            </button>
          </li>
          <li>
            <Link href="/courses">
              <button className="text-[#0083db]">
                <BiBookBookmark size="1.8em" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllChat;
