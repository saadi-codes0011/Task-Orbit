const User = require("../modals/User");
const getProfile = async (req, res) => {
  try {

    req.user.id;

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

   console.error("GET PROFILE ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {

    const users = await User.find({
      _id: { $ne: req.user.id }
    }).select("-password");

    res.status(200).json(users);

  } catch (error) {

    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const { FirstName="", LastName="" } = req.body;

    const updateData = {
      FirstName,
      LastName,
    };
    if (req.file) {
      updateData.profilePic = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(updatedUser);

  } catch (error) {

    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUsers,
};