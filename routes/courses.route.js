import express from 'express';
import {
    addCourse,
    deleteCourse,
    getCourses,
    getSingleCourse,
    updateCourse
} from '../controllers/course.controller.js';
import advancedResult from '../middleware/advancedResult.js';
import Course from '../models/Course.js';

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        advancedResult(Course, {
            path: 'bootcamp',
            select: 'name description'
        }),
        getCourses
    )
    .post(addCourse);

router
    .route('/:id')
    .get(getSingleCourse)
    .put(updateCourse)
    .delete(deleteCourse);

export default router;
