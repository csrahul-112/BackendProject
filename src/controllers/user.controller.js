import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.upload.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {

    /**
     * get user details from frontend
     * validation- not empty and later on we will check correct format of email, username etc
     * check if user already exist
     * check for images, check for avatar as it's required
     * upload them to cloudinary, avatar 
     * create user object - create entry in db
     * remove password and refresh token field from response
     * check for user creation
     * return res
     */
    const {fullname, email, username, password } = req.body

    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All Fields Are required")
    }

    const existedUsername = await User.findOne({
        username
    })
    if (existedUsername){
        throw new ApiError(409, "username already Exist try a different one")
    }
    const existedEmail = await User.findOne({
        email
    })
    if (existedEmail){
        throw new ApiError(409, "Email Already Registered")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;  //this will throw error in case no coverImage is provided
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if (!avatar) {
        throw new ApiError(400, "Avatar File is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar,
        coverImage: coverImage || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Some Error Occured while Registering the User")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
} )






export { registerUser }