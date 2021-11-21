import jwt from "jsonwebtoken"
import { ACCESSTOKEN_SECRET } from "../config/index.js"

export const signJWT = (payload, expiry = "1y", secret = ACCESSTOKEN_SECRET) => {

    return jwt.sign(payload, secret, { expiresIn: expiry })
}

export const verifyJWT = (token, secret = ACCESSTOKEN_SECRET) => {
    return jwt.verify(token, secret)
}
