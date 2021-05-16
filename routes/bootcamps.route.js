import express from 'express';
import {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getBootcampsInRadius,
    bootcampPhotoUpload
} from '../controllers/bootcamp.controller.js';
import router from './courses.route.js';

// Include other resource routers
import courseRouter from './courses.route.js';
import advancedResults from '../middleware/advancedResult.js';
import Bootcamp from '../models/Bootcamp.js';

const bootcampRoute = express.Router();

// Re-route into other resource router
bootcampRoute.use('/:bootcampId/courses', courseRouter);

bootcampRoute.get('/radius/:zipcode/:distance', getBootcampsInRadius);

bootcampRoute
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getAll)
    .post(createOne);

bootcampRoute.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

bootcampRoute.route('/:id/photo').put(bootcampPhotoUpload);

export default bootcampRoute;
