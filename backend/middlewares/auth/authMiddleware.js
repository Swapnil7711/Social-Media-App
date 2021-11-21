import CustomeErrorHandler from "../../services/CustomErrorHanlder.js";
import { verifyJWT } from "../../services/jwtService.js";

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return next(CustomeErrorHandler.Unauthorized("Unauthorized request"))
    }

    const token = authHeader.split(" ")[1];

    console.log(`token is ${token}`)

    try {
        const { _id, email } = verifyJWT(token)

        console.log(`user is ${_id} ${email}`)

        const user = {
            _id,
            email
        }

        req.user = user;

    } catch (error) {
        return next(error)
    }

    next();

}

export default authMiddleware;