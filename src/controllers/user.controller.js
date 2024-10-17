import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async ( req , res )=>{
    
// get user details from frontend
// validation check (Not empty)
// check if user already exist
// check for images
// check for avatar
// upload them to cloudinary , check avatar
// create user object - entry in db
// remove password and refresh token from response
// check user created or not
// return response

const {fullName, userName, email, password} = req.body

if (
    [fullName,userName,email,password].some((field)=> field?.trim() === "")
) {
    throw new ApiError(400,"All fields are required")
}

const existedError = User.findOne({
    $or:[{ email }, { userName }]
})

if (existedError) {
    throw new ApiError(409," user with email or username already exist")
}

const avatarLocalPath = req.files?.avatar[0].path;
const coverImageLocalPath = req.files?.coverImage[0].path;

if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required !")
}

const avatar = await uploadOnCloudinary(avatarLocalPath) 
const coverImage = await uploadOnCloudinary(coverImageLocalPath) 

if (!avatar) {
    throw new ApiError(400,"Avatar file is required !")
}

const user = await User.create(
    {
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    userName:userName.toLowercase()

    }
)

const createdUser = User.findById(user._id).select(["-password -refreshToken"])

if (!createdUser) {
    throw new ApiError(500,"something went wrong while creating an user object")
}

return res.status(201).json(ApiResponse(200,createdUser,"User created successfully"))

}) 

export { registerUser }