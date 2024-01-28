import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

import dotenv from 'dotenv'
dotenv.config()


export const verifyJWT = asyncHandler (async (req,res,next) => {
    try {
        
        const token =  req.cookies?.accessToken || req.header("authorization").replace("bearer ", "")
        if(!token){
            throw new ApiError(401,"Unauthorized Access")
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"Invalid Access")
        }

        req.user = user
        next()


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
        
    }
}) 
