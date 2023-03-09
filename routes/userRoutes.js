const express = require('express');
const userRouter = express.Router();
const {getUsers,addUser,createRequest,getRequests,getFriends, getSuggestions} = require("../controllers/users")
userRouter.get('/',getUsers);
userRouter.post('/create',addUser);
userRouter.post('/add/:userA/:userB',createRequest);
userRouter.get('/friendRequests/:userA',getRequests);
userRouter.get('/friends/:userA',getFriends);
userRouter.get('/suggestions/:userA',getSuggestions);
module.exports = userRouter;
//comment
