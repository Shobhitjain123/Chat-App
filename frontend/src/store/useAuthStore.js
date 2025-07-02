import {create} from 'zustand'
import axiosInstance from '../lib/axios.js'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

export const userAuthStore = create((set, get) => ({
    authUser: null,
    isLogginIn: false,
    isSigningIn: false,
    isUpdatingProfile: false,

    isCheckingUserAuth: true,
    onlineUsers: [],

    socket: null,
    
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connect) return

        const socket = io(import.meta.env.VITE_BACKEND_SERVER_BASE_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()    
        set({socket})
        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect()
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            console.log("Response from check-auth route", res);
            
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in Auth", error);
            
            set({authUser: null})
        } finally {
            set({isCheckingUserAuth: false})
        }
    },

    signup: async (data) => {
        try {
            set({isSigningIn: true})
            const response = await axiosInstance.post("/auth/signup", data)
            set({authUser: response.data})
            toast.success("Account Created Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningIn: false})
        }
    },

    login: async (data) => {
        try {
            set({isLogginIn: true})
            const response = await axiosInstance.post("/auth/login", data)
            set({authUser: response.data})
            toast.success(response.data.message)
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isLogginIn: false})
        }
    },

    logout: async () => {
       try {
        const response = await axiosInstance.get("/auth/logout")
        set({authUser: null})
        toast.success(response.data.message)
        get().disconnectSocket()
       } catch (error) {
        toast.error(error.response.data.message)
       }
    },

    updateProfile: async(profileData) => {
        set({isUpdatingProfile: true})
        try {
           const response = await axiosInstance.put("/auth/update-profile", profileData)
           console.log("Response from update profile", response);
           
           set({authUser: response.data})
           console.log("Updated auth user");
           
           toast.success("Profile updated successfully")
        } catch (error) {
            console.error("Error in updating profile", error.message)
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile: false})
        }
    }
}))