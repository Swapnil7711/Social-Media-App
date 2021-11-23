import Joi from "joi"
import { verifyJWT } from "../services/jwtService.js"
import { REFRESHTOKEN_SECRET } from "../config/index.js"
import RefreshTokens from "../models/RefreshTokens.js"
import User from "../models/User.js"
import { signJWT } from "../services/jwtService.js"
export const refreshController = {

    async refresh(req, res, next) {

        const refreshSchema = Joi.object({
            refreshToken: Joi.string().required(),
        });

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        let refresh_Token;

        // search in database for token

        try {

            refresh_Token = await RefreshTokens.findOne({ refreshToken: req.body.refreshToken })

        } catch (error) {
            return next(new Error("invalid refresh Token"))
        }

        // if token found verify the token with jwtVerify
        let userId
        try {

            const { _id } = verifyJWT(refresh_Token.refreshToken, REFRESHTOKEN_SECRET)

            userId = _id;

        } catch (error) {
            console.log("2")

            return next(new Error("invalid refresh token"))

        }

        try {
            const user = await User.findOne({ _id: userId })

            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user found!'));
            }

            // if user found delete the previous refreshToken and create new access and refresh token
            const accessToken = signJWT({ _id: user._id, email: user.email })
            const refreshToken = signJWT({ _id: user._id, email: user.email }, "1y", REFRESHTOKEN_SECRET)

            // save refresh token in database

            await RefreshTokens.create({ refreshToken: refreshToken })
            await RefreshTokens.deleteOne({ refreshToken: refresh_Token.refreshToken })

            res.json({ accessToken, refreshToken })

        } catch (error) {

            return next(error)

        }
    }

}