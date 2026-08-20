const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    hasLoggedIn: {
      type: Boolean,
      default: false,
    },

    youtube: {
      accessToken: String,
      refreshToken: String,
      expiryDate: Number,
    },
    spotify: {
  accessToken: String,
  refreshToken: String,
  expiryDate: Number,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);