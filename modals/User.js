const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default:
        "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff",
    },
    role: {
      type: String,
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);