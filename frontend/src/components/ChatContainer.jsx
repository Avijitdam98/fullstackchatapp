import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-900 text-white">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-900 text-white p-6">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-custom">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500 bg-gray-800 shadow-lg hover:shadow-xl transition-all">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="object-cover rounded-full"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-70 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div
              className={`chat-bubble flex flex-col p-4 shadow-md rounded-xl transition-all max-w-[85%] ${
                message.senderId === authUser._id
                  ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 shadow-md"
                />
              )}
              {message.text && (
                <p className="text-md font-medium leading-relaxed">
                  {message.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
