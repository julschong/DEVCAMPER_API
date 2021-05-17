import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import colors from 'colors';
import express from 'express';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route.js';
import bootcampRoute from './routes/bootcamps.route.js';
import courseRoute from './routes/courses.route.js';
import connectDB from './config/db.js';
import errorHander from './middleware/error.js';

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File upload
app.use(fileupload());

// Use static page
app.use(express.static('./public'));

// Route files
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/bootcamps', bootcampRoute);
app.use('/api/v1/courses', courseRoute);

// Error Handler Middleware
app.use(errorHander);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
);

// Handle unhandled rejections
process.on('unhandledRejection', (err, _promise) => {
    console.log(`unhandled Rejection Error: ${err.name} -- ${err.message}`.red);
    //Close Server and Exit process
    server.close(() => process.exit(1));
});
