import mongoose from "mongoose"
import { APP_URL } from "../config/index.js"
const { Schema } = mongoose;

const postSchema = new Schema({
    postText: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.Object, ref: 'User' }],
    comments: [{ type: Schema.Types.Object, ref: 'User' }],
    postImage: {
        type: String, required: false, get: (postImage) => {
            return `${APP_URL}/${postImage}`
        }
    }
},
    { timestamps: { createdAt: 'created_at' }, toJSON: { getters: true }, id: false }
)

export default mongoose.model('Post', postSchema, 'posts')