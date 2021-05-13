import express from 'express';
import {
    addCourse,
    deleteCourse,
    getCourses,
    getSingleCourse,
    updateCourse
} from '../controllers/course.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);

router
    .route('/:id')
    .get(getSingleCourse)
    .put(updateCourse)
    .delete(deleteCourse);

export default router;
