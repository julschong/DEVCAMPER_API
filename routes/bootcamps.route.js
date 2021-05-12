import express from 'express';
import {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getBootcampsInRadius
} from '../controllers/bootcamp.controller.js';

// Include other resource routers
import courseRouter from './courses.route.js';

const bootcampRoute = express.Router();

// Re-route into other resource router
bootcampRoute.use('/:bootcampId/courses', courseRouter);

bootcampRoute.get('/radius/:zipcode/:distance', getBootcampsInRadius);

bootcampRoute.get('/', getAll);

bootcampRoute.post('/', createOne);

bootcampRoute.get('/:id', getOne);

bootcampRoute.put('/:id', updateOne);

bootcampRoute.delete('/:id', deleteOne);

export default bootcampRoute;
