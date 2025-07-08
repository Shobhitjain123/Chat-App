import {create} from 'zustand'
import axiosInstance from '../lib/axios.js'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.VITE_SERVER_URL
console.log("Server base url", BASE_URL);

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
        console.log("User is unser connect socket");
        
        if(!authUser || get().socket?.connect) return
        console.log("User is now here");
        
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()    
        set({socket})
        socket.on("getOnlineUsers", (userIds) => {  
            set({onlineUsers: userIds})
        })
        console.log("Online users", onlineUsers);
        
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect()
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/api/auth/check")
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
            const response = await axiosInstance.post("/api/auth/signup", data)
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
            const response = await axiosInstance.post("/api/auth/login", data)
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
        const response = await axiosInstance.get("/api/auth/logout")
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
           const response = await axiosInstance.put("/api/auth/update-profile", profileData)
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