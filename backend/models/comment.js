import mongoose from "mongoose";

/**comment schema */
const commentSchema = new mongoose.Schema({
    licensePlate: { type: String, required: true },
    comments: [{
        username: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, required: true }
    }]
})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;