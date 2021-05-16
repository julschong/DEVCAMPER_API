import ErrorResponse from '../utils/errorResponse.js';

const errorHander = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    // console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {
        const duplicate = err.keyValue;

        const message = `Duplicate ${Object.keys(duplicate)}: ${Object.values(
            duplicate
        )}`;
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        const message = Object.keys(err.errors)
            .map((el) => err.errors[el].properties.message)
            .join(', ');
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

export default errorHander;
