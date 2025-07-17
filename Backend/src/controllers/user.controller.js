import User from "../models/user.model.js";
import { SuccessApiResponse, FailApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynncHandler.util.js";

import mongoose from "mongoose";

const addPoints = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // 1. Check if userId exists
    if (!userId) {
        return res.status(400).json(
            new FailApiResponse({ message: "User ID is required" })
        );
    }

    // 2. Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json(
            new FailApiResponse({ message: "Invalid User ID format" })
        );
    }

    // 3. Generate random points (1-10)
    const pointsToAdd = Math.floor(Math.random() * 10) + 1;

    // 4. Update user
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $inc: { points: pointsToAdd },
            $push: {
                history: {
                    points: pointsToAdd,
                    awardedAt: new Date()
                }
            }
        },
        { new: true }
    );

    // 5. Check if user was found and updated
    if (!updatedUser) {
        return res.status(404).json(
            new FailApiResponse({ message: "User not found" })
        );
    }

    // 6. Return success response
    return res.status(200).json(
        new SuccessApiResponse({
            message: "Points added successfully",
            data: {
                user: updatedUser,
                addedPoints: pointsToAdd
            }
        })
    );
});

const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
        .sort({ points: -1 })
        .select('name points history')
        .lean();


    const usersWithRank = users.map((user, index) => ({
        ...user,
        rank: index + 1
    }));

    return res.status(200).json(
        new SuccessApiResponse({
            message: "Users retrieved successfully",
            data: usersWithRank
        })
    );
});

const addNewUser = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Validate input
    if (!name) {
        res.status(400);
        throw new Error('Name is required');
    }

    // Create new user - asyncHandler will catch any errors
    const newUser = await User.create({ name });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            _id: newUser._id,
            name: newUser.name,
            points: newUser.points,
            createdAt: newUser.createdAt
        }
    });
});
export {
    addNewUser,
    addPoints,
    getAllUsers
};