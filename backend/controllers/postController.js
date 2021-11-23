import Joi from "joi"
import Post from "../models/Post.js"
import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
});


const handleImageData = multer({ storage: storage }).single('postImage');


export const postController = {


    async createPost(req, res, next) {

        handleImageData(req, res, async (err) => {


            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return next(new Error("Error While uploading file"))
            } else if (err) {
                return next(new Error("unknown error occured"))
            }
            // Everything went fine.

            const postSchema = Joi.object({

                postText: Joi.string().required(),
                postImage: Joi.string()

            })

            const filepath = req.file.path;

            const { error } = postSchema.validate(req.body);

            if (error) {
                fs.unlink(`${APP_ROOT}/${filepath}`, (err) => {
                    if (err) {
                        return next(new Error(err.message))
                    }
                })
                return next(error)
            }

            console.log(req.file.path) // gives path to file in uploads folder
            console.log(req.user)// gives currently logged in user {authMiddleware}

            const postText = req.body.postText;
            const userId = req.user._id;

            let document;
            try {

                document = await Post.create({
                    postText: postText,
                    postImage: filepath,
                    userId: userId
                })

            } catch (error) {
                return next(new Error("error occured while creating post"))
            }

            res.status(201).json(document);
        });
    }
}