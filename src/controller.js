import {
    successResponse,
    errorResponse,
    failResponse,
  } from "./helpers/response";

import * as funcs from "./funcs";


export const createUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if(!userId) return failResponse(req, res, "userId is required");

        if(!email && !mobile) return failResponse(req, res, "email or mobile is required");

        const result = await funcs.createUser(userId, req.body);
        return successResponse(req, res, result);
      } catch (error) {
        return errorResponse(req, res, error, "error");
      }
  };

export const sendFriendRequest = async (req, res) => {
    try {
        const { userA, userB } = req.params;
        if(!userA) return failResponse(req, res, "userA is required");
        if(!userB) return failResponse(req, res, "userB is required");
        const result = await funcs.sendFriendRequest(userA, reqB);
        return successResponse(req, res, result);

    }  catch (error) {
        return errorResponse(req, res, error, "error");
    }

    

   
  };

export const getAllFriendRequests = async (type, userData) => {
   
  };

export const getAllFriends = async (type, userData) => {
   
  };

export const getAllSuggestions = async (type, userData) => {
   
  };
  