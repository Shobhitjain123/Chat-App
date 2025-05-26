import {create} from 'zustand'
import axiosInstance from '../lib/axios.js'

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

    signup: async () => {}
}))