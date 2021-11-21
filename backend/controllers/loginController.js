import User from "../models/User.js";
import bcrypt from "bcrypt"
import joi from "joi"
import CustomeErrorHandler from "../services/CustomErrorHanlder.js";
import { signJWT } from "../services/jwtService.js";
import { ACCESSTOKEN_SECRET, REFRESHTOKEN_SECRET } from "../config/index.js";
import RefreshTokens from "../models/RefreshTokens.js";


export const loginController = {

    async login(req, res, next) {

        // validate the request 

        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = loginSchema.validate(req.body)

        if (error) {
            return next(error);
        }

        // destructure the req object

        const { email, password } = req.body;


        try {
            const user = await User.findOne({ email: email })

            if (!user) {

                return next(CustomeErrorHandler.wrongCredentials("You entered wrong email"))
            }

            // compare the password

            const match = await bcrypt.compare(password, user.password)

            if (!match) {
                return next(CustomeErrorHandler.wrongCredentials("You entered wrong password"))
            }

            //  create tokens for user
            const accessToken = signJWT({ _id: user._id, email: user.email })
            const refreshToken = signJWT({ _id: user._id, email: user.email }, "1y", REFRESHTOKEN_SECRET)

            // once refresh token created, store it in database
            await RefreshTokens.create({ refreshToken });

            res.json({ accessToken, refreshToken })


        } catch (error) {
            return next(error);
        }

    },

    async logout(req, res, next) {

        const logoutSchema = joi.object({
            refreshToken: joi.string().required(),
        })

        console.log(JSON.stringify(req.body))

        const { error } = logoutSchema.validate(req.body)

        if (error) {
            return next(error)
        }

        try {

            const result = await RefreshTokens.deleteOne({ refreshToken: req.body.refreshToken })

            console.log(result)

            if (result.deletedCount < 1) {
                return next(new Error("something went wrong in the databae"))
            }

        } catch (err) {
            return next(new Error("something went wrong"))
        }

        res.json({ logout: "logout success" })
    }
}