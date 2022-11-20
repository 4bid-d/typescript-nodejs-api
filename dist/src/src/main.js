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
const cors_1 = __importDefault(require("cors"));
// import * as dotenv from "dotenv"
require('dotenv').config();
// dotenv.config()
const app = (0, express_1.default)();
const router_1 = require("./router");
const cookie_session_1 = __importDefault(require("cookie-session"));
const myLogger = function (req, res, next) {
    console.log("Request IP: " + req.ip);
    console.log("Request Method: " + req.method);
    console.log("Request date: " + new Date());
    next(); // THIS IS IMPORTANT!
};
app.use(myLogger);
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200
}));
app.set("trust proxy", true);
app.use((0, body_parser_1.urlencoded)({
    extended: false
}));
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false
}));
app.use(router_1.newPostRouter);
app.use(router_1.deletePostRouter);
app.use(router_1.showPostRouter);
app.use(router_1.updatePostRouter);
app.use(router_1.newCommentRouter);
app.use(router_1.deleteCommentRouter);
app.all("*", (req, res, next) => {
    const err = new Error("not found");
    err.status = 404;
    next(err);
});
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
    if (process.env.JWT_TOKEN === undefined)
        throw new Error("JWT_TOKEN doesnt exists.");
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI, () => {
            console.log("connected");
        });
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
start();
app.listen(3000, () => { console.log("server started."); });
