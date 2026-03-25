import Conversation from "../Models/conversationModel.js";
import User from "../Models/userSchema.js";

export const getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user.id;

    const users = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: search, $options: "i" } },
            { fullname: { $regex: search, $options: "i" } }
          ]
        },
        {
          _id: { $ne: currentUserId }
        }
      ]
    }).select("-password");

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      message: "server error",
      success: false,
      error: error.message
    });
  }
};



export const getCurrentChatters = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // 1. find conversations
    const conversations = await Conversation.find({
      participants: currentUserId
    })
      .sort({ updatedAt: -1 }) // latest chats on top
      .populate("participants", "-password");

    // 2. get other users (exclude current user)
    const users = conversations.map((chat) => {
      return chat.participants.find(
        (p) => p._id.toString() !== currentUserId.toString()
      );
    }).filter(Boolean);

    // 3. remove duplicates 
    const uniqueUsers = Array.from(
      new Map(users.map((u) => [u._id.toString(), u])).values()
    );

    res.status(200).json({
      success: true,
      users: uniqueUsers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};