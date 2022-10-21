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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
// import * as dotenv from "dotenv"
require('dotenv').config();
// dotenv.config()
const app = (0, express_1.default)();
const updatePostRouter = require("./router/update");
const showPostRouter = require("./router/show");
const deletePostRouter = require("./router/delete");
const newPostRouter = require("./router/new");
app.use((0, body_parser_1.urlencoded)({
    extended: true
}));
app.use((0, body_parser_1.json)());
app.use((error, req, res, next) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }
    res
        .status(500)
        .json({ message: error.message });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.MONGO_URI === undefined)
        throw new Error("MONGO_URI doesnt exists.");
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI, () => {
            console.log("connected");
        });
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
app.use("/api/post/new", newPostRouter);
app.use("/api/post/delete", deletePostRouter);
app.use("/api/post/show", showPostRouter);
app.use("/api/post/update", updatePostRouter);
start();
app.listen(3000, () => { console.log("server started."); });
