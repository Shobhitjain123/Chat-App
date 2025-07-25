import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios.js'
import { create } from 'zustand'
import { userAuthStore } from './useAuthStore.js'
export const useChatStore = create((set, get) => ({
    users: [],
    messages: [],
    selectedUser: null,
    isMessageLoading: false,
    isUsersLoading: false,

    getUsers: async () => {
        try {
            set({isUsersLoading: true})
            const response = await axiosInstance.get("/api/message/user")
            set({users: response.data})
        } catch (error) {
            console.error("Error in fetcing users", error.message);
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async(userId) => {
        try {
            set({isMessageLoading: true})
            const response = await axiosInstance.get(`/api/message/${userId}`)
            toast.success("Messages fetched")
            set({messages: response.data})
        } catch (error) {
            console.error("Error in fetching messages", error.message);              
        } finally{
            set({isMessageLoading: false})
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),

    sendMessage: async (messageData) => {
        const {messages, selectedUser} = get()
             
        try {
            const response = await axiosInstance.post(`/api/message/send/${selectedUser._id}`, messageData)
       
            set({messages: [...messages, response.data.newMessage]})
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get()
        if(!selectedUser) return

        const socket = userAuthStore.getState().socket

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return 
            set({messages: [...get().messages, newMessage]})
        })
    },

    unsubScribeFromMessages: () => {
        const socket = userAuthStore.getState().socket

        socket.off("newMessage")
    }
}))