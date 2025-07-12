import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token
           
        if(!token){
            return res.status(401).json({
                message: "User not authorized"
            })
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
       
        const user = await User.findOne({_id: decodedToken.id}).select("-password")       
        if(!user){
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        
        req.user = user
    
    } catch (error) {
        console.error("Error Authentication User", error.message);

        res.status(500).json({
            message: "Error auuthenticating user"
        })

    }

    next()

}