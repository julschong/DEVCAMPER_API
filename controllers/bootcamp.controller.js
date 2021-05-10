import Bootcamp from '../models/Bootcamp.js'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/async.js'

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

export const getAll = asyncHandler(async (_req, res, _next) => {
    const bootcamps = await Bootcamp.find({})
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getOne = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id of ${req.params.id}`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
export const createOne = asyncHandler(async (req, res, _next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
})

// @desc    Update single bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Private
export const updateOne = asyncHandler(async (req, res, _next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!bootcamp) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

// @desc    Delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteOne = asyncHandler(async (req, res, _next) => {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    console.log(deletedBootcamp)
    if (!deletedBootcamp) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true,
        data: deletedBootcamp
    })
})
