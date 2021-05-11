import Bootcamp from '../models/Bootcamp.js'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/async.js'
import geocoder from '../utils/geocoder.js'

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

export const getAll = asyncHandler(async (req, res, _next) => {
    let query

    // Coppy req.query to manipulate
    const reqQuery = { ...req.query }

    // Fields to exclude
    const removeFields = ['select', 'sort', 'limit', 'page']

    // Loop over removeFields to remove field from reqQuery
    removeFields.forEach((param) => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(reqQuery)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    )

    // Finding resource
    query = Bootcamp.find(JSON.parse(queryStr))

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // Set Sort Fields
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('name')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 100
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    // Execute Query
    const bootcamps = await query
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

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Public
export const getBootcampsInRadius = asyncHandler(async (req, res, _next) => {
    const { zipcode, distance } = req.params

    // Get lat/lng from geocoder
    let loc = await geocoder.geocode(zipcode)
    loc = loc[0]
    const lat = loc.latitude
    const lng = loc.longitude

    // calculate radius
    const radius = distance / 3963 // miles

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})
