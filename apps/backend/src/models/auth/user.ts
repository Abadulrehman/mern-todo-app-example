import mongoose from "mongoose";
import { hash } from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    strictQuery: false,
  }
);

// Encrypt password before save
userSchema.pre("save", async function () {
  // `this` in this context is the user
  if (this.isModified("password")) {
    this.password = await hash(this.password, 8);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
