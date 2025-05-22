import mongoose from 'mongoose'

export const dbConnect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection Successfull", conn.connection.host);
        
    } catch (error) {
        console.log("Database Connecttion failed", error.message);
        
    }
}