import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios.js'
import { create } from 'zustand'
export const useChatStore = create((set) => ({
    users: [],
    messages: [],
    selectedUser: null,
    isMessageLoading: false,
    isUsersLoading: false,

    getUsers: async () => {
        try {
            set({isUsersLoading: true})
            const response = await axiosInstance.get("/message/user")
            set({users: response.data})
        } catch (error) {
            console.log("Error in fetcing users", error.message);
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async(userId) => {
        try {
            set({isMessageLoading: true})
            const response = await axiosInstance.get(`/message/${userId}`)
            toast.success("Messages fetched")
            set({messages: response.data})
        } catch (error) {
            console.log("Error in fetching messages", error.message);   
            toast.error(error.response.data.message)            
        } finally{
            set({isMessageLoading: false})
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})
}))