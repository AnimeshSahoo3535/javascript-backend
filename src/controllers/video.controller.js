import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asynchandler } from "../utils/asynchandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asynchandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    const offset = (page - 1) * limit;
 
     const getvideos = await Video.aggregate([
         {
             $match: {
                 _id: new mongoose.Types.ObjectId(userId)
             }
         },
         {
             $lookup: {
                 from: "users",
                 localField: "owner",
                 foreignField: "_id",
                 as: "User Detail"
             },
             pipeline: [
                 {
                     $project: {
                         username: 1,
                         avatar: 1,
                         coverImage: 1,
                     }
                 }
             ]
         },
         {
             $sort: {
                 [sortBy]: sortType === 'asc' ? 1 : -1
             }
 
 
         },
         {
             $skip: offset
         },
         {
             $limit: limit
         }
 
     ])
 
      if (!getvideos) {
    throw ApiError("Error while geting all videos",error)
   }
    const Allvideos = await Video.aggregatePaginate(getvideos)
    res.status(200).json(new ApiResponse(
        200,
        Allvideos,
        "All videos have been fetched"
    ))

})

const publishAVideo = asynchandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asynchandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asynchandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asynchandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asynchandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}