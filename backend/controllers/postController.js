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
    },

    async getPosts(req, res, next) {

        // get all posts from database and return it to fontend
        try {

            const posts = await Post.find().select("-__v").sort('field -_id');

            res.json({ posts })

        } catch (error) {

            return next(error);

        }
    },

    async likePost(req, res, next) {

        const userId = req.user._id;

        console.log(userId)
        let post = await Post.findOne({ _id: req.params.postId })
        let likesarray = post.likes;
        let bool = false
        for (let i = 0; i < likesarray.length; i++) {
            if (likesarray[i].userId === userId) {
                likesarray.splice(i, 1);
                bool = true
            }
        }

        if (!bool) {
            likesarray.push({ userId: userId, firstName: req.user.firstName, lastName: req.user.lastName, profileUrl: req.user.profileUrl })
        }


        // if (likesarray.includes(userId)) {
        //     const index = likesarray.indexOf(userId);
        //     if (index > -1) {
        //         likesarray.splice(index, 1);
        //     }
        // } else {
        //     likesarray.push({ userId: userId, firstName: req.user.firstName, lastName: req.user.lastName, profileUrl: req.user.profileUrl })
        // }

        let doc = await Post.findOneAndUpdate({ _id: req.params.postId }, { likes: likesarray }, { new: true })
        console.log(doc)
        res.json({ doc: doc })
    },

    async postComments(req, res, next) {

        const commentSchema = Joi.object({
            comment: Joi.string().required(),
        })
        console.log(req.body)
        const { error } = commentSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        const userId = req.user._id;

        console.log(userId)

        try {

            let post = await Post.findOne({ _id: req.params.postId })
            let commentsarray = post.comments;
            commentsarray.push({ userId: userId, firstName: req.user.firstName, lastName: req.user.lastName, profileUrl: req.user.profileUrl, comment: req.body.comment })
            let doc = await Post.findOneAndUpdate({ _id: req.params.postId }, { comments: commentsarray }, { new: true })
            console.log(doc)
            res.json({ doc: doc })

        } catch (error) {
            return next(new Error("DB error"))
        }

    }
}