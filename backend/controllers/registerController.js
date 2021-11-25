import joi from "joi"
import User from "../models/User.js"
import CustomeErrorHandler from "../services/CustomErrorHanlder.js"
import bcrypt from "bcrypt"
import { signJWT } from "../services/jwtService.js"
import { REFRESHTOKEN_SECRET } from "../config/index.js"
import RefreshToken from "../models/RefreshTokens.js"

export const registerController = {

    async register(req, res, next) {

        // CHECKLIST
        // [*] validate the request
        // [ ] authorise the request
        // [*] check if user is in the database already
        // [*] prepare model
        // [*] store in database
        // [ ] generate jwt token
        // [ ] send response

        const registerSchema = joi.object({
            firstName: joi.string().min(3).max(30).required(),
            lastName: joi.string().required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            dob: joi.date().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            confirmPassword: joi.ref('password')
        });

        console.log(`body is ${JSON.stringify(req.body)}`)

        const { firstName, lastName, email, password, confirmPassword, dob } = req.body;

        const { error } = registerSchema.validate({ firstName, lastName, email, password, confirmPassword, dob })

        if (error) {
            return next(error)
        }

        // Check if user is already in database
        try {

            const exists = await User.exists({ email: email })

            if (exists) {
                return next(CustomeErrorHandler.alreadyExists("User already exists with this email"))
            }

        } catch (error) {
            return next(error)
        }

        // hash the password before inserting a user. Use bceypt for password hashing

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            dob: dob,
            password: hashedPassword
        })

        // save the user in database
        let accessToken;
        let refreshToken;

        try {
            const result = await user.save();
            console.log(result);


            // genrate Access and Refresh Tokens after user saved
            accessToken = signJWT({ _id: result._id, email: result.email })
            refreshToken = signJWT({ _id: result._id, email: result.email }, "1y", REFRESHTOKEN_SECRET)

            // once refresh token created, store it in database
            await RefreshToken.create({ refreshToken });


        } catch (error) {
            return next(error)
        }


        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })

    }
}