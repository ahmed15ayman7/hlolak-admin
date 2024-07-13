"use client";
import React from "react";
import { useEffect, useState } from "react";
import { pusherClient } from "../pusher";
import {testPusher} from "../actions/user.actions"
interface Message {
  text: string;
  user: string;
}
const SocketComp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const subscribedChannel = pusherClient.subscribe("task");
      subscribedChannel.bind("RoomName", (msg:any) => {
        // setMessages((prevMessages) => [...prevMessages, msg]);
        console.log(msg)
      });
    return () => {
      pusherClient.unsubscribe("task");
    };
  }, []);
 

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    await testPusher()
    setText("");
  };
  return <div onClick={handleSubmit}>SocketComp</div>;
};

export default SocketComp;
