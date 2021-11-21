import mongoose from "mongoose"

const Schema = mongoose.Schema;

const refreshSchema = new Schema({

    refreshToken: { type: String, unique: true }

}, { timestamp: false });

export default mongoose.model("RefreshToken", refreshSchema)