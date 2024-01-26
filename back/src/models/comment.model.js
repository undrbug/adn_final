import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
});

const Comment = mongoose.model('Comment', commentSchema)

export default Comment