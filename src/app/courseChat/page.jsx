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
  const { chatAccessKey, chatID } = courseData;
  return (
    <div className="relativen">
      <ChatEngineWrapper>
        <ChatSocket
          projectID="27a5ab30-23cb-4d38-9933-71b24af69399"
          chatID={chatID}
          chatAccessKey={chatAccessKey}
          senderUsername={username}
        />
        <div className="chatBox">
          <ChatFeed
            activeChat={chatID}
            renderNewMessageForm={() => <MessageFormSocial />}
          />
          {/* <ChatSettings /> */}
        </div>
      </ChatEngineWrapper>
    </div>
  );
};

export default CourseChat;
