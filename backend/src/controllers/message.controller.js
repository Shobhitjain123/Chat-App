import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId , io} from "../lib/socket.js";

const getUsersList = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Unauhorized user",
      });
    }

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    if (!filteredUsers) {
      return res.status(400).json({
        message: "Users not found",
      });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getting all users", error.message);
    res.status(500).json({
      message: "Error in getting users",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    console.log("user ID", typeof myId);
    console.log("user to chat with ID", typeof userToChatId);

    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error getting in messages", error.message);
    res.status(500).json({
      message: "Error getting in messages",
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    // Get the message to be sent
    // get sender Id
    // get reciever id
    // if message is an image, upload it to cloudinary
    // save new message in the db
    // send message

    const { text, image } = req.body;
    const senderId = req.user._id;
    const {id: recieverId} = req.params;

    let imgURL;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgURL = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      text,
      senderId,
      recieverId,
      image: imgURL,
    });

    if (!newMessage) {
      return res.status(400).json({
        message: "Could not create a new message",
      });
    }

    const recieverSocketId = getRecieverSocketId(recieverId)

    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage", newMessage)
    }

    res.status(200).json({
      message: "Message Sent successfully",
      newMessage,
    });
    
  } catch (error) {
    console.log("Error in sending message", error.message);
    res.status(500).json({
      message: "Error in sending message",
    });
  }
};

export { getUsersList, getMessages, sendMessage };
