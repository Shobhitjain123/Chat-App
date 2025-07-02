import { useEffect, useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import {formatMessageTime} from '../lib/utils.js'
import { userAuthStore } from "../store/useAuthStore.js"
import MessageSkeleton from './MessageSkeleton'
import ChatHeader from "./ChatHeader"
import MessageInput from './MessageInput'
const ChatContainer = () => {

  const {messages, selectedUser, isMessageLoading, getMessages, subscribeToMessages, unsubScribeFromMessages} = useChatStore()
  const {authUser} = userAuthStore()
  const messageRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()
    return () => unsubScribeFromMessages()
  }, [selectedUser, getMessages, subscribeToMessages, unsubScribeFromMessages])
  
  useEffect(() => {
    if(messages && messageRef.current){
      messageRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])
  
  if(isMessageLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <MessageSkeleton />

      <MessageInput />
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 spacey-4">
        {
          messages.map((msg) => (
            <div key={msg._id} className={`chat ${msg.senderId === authUser._id ? 'chat-end' : 'chat-start'}`} ref={messageRef}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img 
                  src={msg.senderId === authUser._id 
                  ? authUser.profilePic || "/avatar.png" 
                  : selectedUser.profilePic || "/avatar.png"} 
                  alt="Profile Pic" />
                </div>
              </div>
              <div className="chat-header mb-1 text-xs opacity-50">
                {msg.senderId === authUser._id ? "You" : selectedUser.fullName}
                <time className="ml-1">
                  {formatMessageTime(msg.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {
                  msg.image && (
                    <img src={msg.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2"/>
                  )
                }
                {
                  msg.text && (
                    <p>{msg.text}</p>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer