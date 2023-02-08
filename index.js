import express from "express";
import * as controller from "./src/controller";

const router = express.Router();

router.post("/create", controller.createUser);
router.post("/add/:userA/:userB", controller.sendFriendRequest);
router.get("/friendRequests/:userA", controller.getAllFriendRequests);
router.get("/friends/:userA", controller.getAllFriends);
router.get("/suggestions/:userA", controller.getAllSuggestions);