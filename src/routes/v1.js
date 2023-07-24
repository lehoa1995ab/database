import express from "express";
const router = express.Router();
import postModule from './modules/post.module'
router.use("/posts",postModule)
import userModule from './modules/user.module'
router.use("/users",userModule)
module.exports = router;