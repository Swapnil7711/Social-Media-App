import dotenv from 'dotenv'

dotenv.config();

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    ACCESSTOKEN_SECRET,
    REFRESHTOKEN_SECRET,
    APP_URL
} = process.env;