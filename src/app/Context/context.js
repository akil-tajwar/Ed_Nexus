'use client';

import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext({})

export const ChatContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");


  const value = {
    username,
    setUsername,
    secret,
    setSecret,
    email,
    setEmail
  };

  return (
    <ChatContext.Provider value={{ value }}>
      {children}
    </ChatContext.Provider>
  )
};

export const useChatContext = () => useContext(ChatContext);
