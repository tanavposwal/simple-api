import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  bio: String,
  data: Date
});

export const User = mongoose.model('User', userSchema);
