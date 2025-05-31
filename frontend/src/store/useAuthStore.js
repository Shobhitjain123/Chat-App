import {create} from 'zustand'
import axiosInstance from '../lib/axios.js'
import toast from 'react-hot-toast';

export const userAuthStore = create((set) => ({
    authUser: null,
    isLogginIn: false,
    isSigningIn: false,
    isUpdatingProfile: false,

    isCheckingUserAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            console.log("Response from check-auth route", res);
            
            set({authUser: res.data})
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
       } catch (error) {
        toast.error(error.response.data.message)
       }
    },

    updateProfile: async(profileData) => {
        set({isUpdatingProfile: true})
        try {
           const response = await axiosInstance.put("/auth/update-profile", profileData)
           set({authUser: response.data})
           toast.success("Profile updated successfully")
        } catch (error) {
            console.error("Error in updating profile", error.message)
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile: false})
        }
    }
}))