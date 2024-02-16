import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Boolean,
    default: false,
  },
},
{
  strict: true,
  strictQuery: false,
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
