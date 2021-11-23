import mongoose from "mongoose"

const { Schema } = mongoose;

const postSchema = new Schema({
    postText: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    postImage: { type: String, required: false }
})

export default mongoose.model('Post', postSchema, 'posts')