"use client";
import dynamic from "next/dynamic";
import {
  ChatEngineWrapper,
  ChatFeed,
  ChatHeader,
  ChatSettings,
  ChatSocket,
} from "react-chat-engine";
import { useChatContext } from "../Context/context";
import './style.css'
// import axios from "axios";

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

const CourseChat = ({ courseData }) => {
  // console.log("courseChat",courseData)
  const { value } = useChatContext();
  const { username } = value;
  console.log("name", username)
  const { chatAccessKey, chatID,courseName } = courseData;
  return (
    <div className="">
      <div className="h-20 flex justify-center items-center bg-white">
        <h1 className="text-center text-4xl font-semibold text-[#0083db]">{courseName}</h1>
      </div>
      <ChatEngineWrapper>
        <ChatSocket
          projectID="43644d8b-ebfa-461a-8fcc-fbbd80d16a42"
          chatID={chatID}
          chatAccessKey={chatAccessKey}
          senderUsername={username}
        />
        <div className="chatBox">
          <ChatFeed
            activeChat={chatID}
            renderNewMessageForm={() => <MessageFormSocial  />}
          />
          {/* <ChatSettings /> */}
        </div>
      </ChatEngineWrapper>
    </div>
  );
};

export default CourseChat;
