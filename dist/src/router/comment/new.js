"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommentRouter = void 0;
const express_1 = require("express");
const comment_1 = __importDefault(require("../../models/comment"));
const post_1 = __importDefault(require("../../models/post"));
const router = (0, express_1.Router)();
exports.newCommentRouter = router;
router.post("/api/comment/new/:postId", (req, 
// router.post("/",async (req :Request ,
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, content } = req.body;
    const { postId } = req.params;
    if (!content) {
        const error = new Error("Content is required");
        error.status = 400;
        next(error);
    }
    const newComment = new comment_1.default({
        username: username ? username : "anonymous",
        content
    });
    yield newComment.save();
    const updatePost = yield post_1.default.findByIdAndUpdate({ _id: postId }, { $push: { comments: newComment } }, { new: true });
    res.status(201).send(newComment);
}));
// module.exports = router 
