import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

const signup = async (req, res) => {
    const {email, fullName, password} = req.body

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName
        })

        if(!newUser){
            return res.status(500).json({
                message: "Error In Creating User"
            })
        }

       const token = generateToken(newUser._id, res)

       newUser.verificationToken = token
       await newUser.save()

        res.status(201).json({
            message: "User Registred Successfully"
        })

    } catch (error) {
        console.log("Error Signing up user", error.message);
        return res.status(500).json({
            message: "Error Signing up user"
        })
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        generateToken(user._id, res)

        res.status(200).json({
            message: "User Login Successfull",
            user: {
                email: user.email,
                fullName: user.fullName,
                profilePic: user.profilePic
            }
        })


    } catch (error) {
        console.log("Error in login in user", error.message);
        res.status(500).json({
            message: "Error in login in user"
        })
        
    }

}

const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({
            message: "User logged out successfully"
        })        
    } catch (error) {
        console.log("Error in log out user", error.message);
        res.status(500).json({
            message: "Error in log out user"
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id
        
        if(!profilePic){
            return res.status(400).json({
                message: "Provide valid profile pic"
            })
        }
        
        const uploadResponse = cloudinary.uploader.upload(profilePic, {public_id: "profile"})
        
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
        res.status(200).json({
            message: "File uploaded successfully",
            updatedUser
        })
    } catch (error) {
        console.log("Error in updating profile pic", error.message);
        res.status(500).json({
            message: "Error in updating profile pic"
        })
        
    }
}
const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in Check Auth Controller", error.message);

        res.status(500).json({message: "Error in Check Auth Controller"})
        
    }
}

export {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
}