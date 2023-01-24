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
exports.newPostRouter = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("../../models/post"));
const router = (0, express_1.Router)();
exports.newPostRouter = router;
router.post("/api/post/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        console.log(title);
        if (!title || !content) {
            const error = new Error("title and content are required");
            error.status = 400;
            // throw error
            return;
        }
        const newPost = new post_1.default({
            title: title !== null && title !== void 0 ? title : "none",
            content
        });
        yield newPost.save();
        res.status(201).send(newPost);
    }
    catch (error) {
        next(error);
    }
}));
// module.exports = router 
