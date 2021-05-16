import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create User
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse(`Please provide an email and password`, 400)
        );
    }

    // Check for User
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    // Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});
