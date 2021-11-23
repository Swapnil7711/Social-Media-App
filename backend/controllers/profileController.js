
import User from "../models/User.js";

export const profileController = {

    async getProfile(req, res, next) {

        const user = req.user;

        const userProfile = await User.findOne({ email: user.email })

        res.json({ userProfile: userProfile })
    }
}
