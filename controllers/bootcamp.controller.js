import Bootcamp from '../models/Bootcamp.js'

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

export const getAll = (_req, res, _next) => {
    res.status(200).json({ success: true, message: `Get all bootcamps` })
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getOne = (req, res, _next) => {
    res.status(200).json({
        success: true,
        message: `Get bootcamp id: ${req.params.id}`
    })
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
export const createOne = async (req, res, _next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
}

// @desc    Update single bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Private
export const updateOne = (req, res, _next) => {
    res.status(200).json({
        success: true,
        message: `Update bootcamp id: ${req.params.id}`
    })
}

// @desc    Delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteOne = (req, res, _next) => {
    res.status(200).json({
        success: true,
        message: `Delete bootcamp id: ${req.params.id}`
    })
}
