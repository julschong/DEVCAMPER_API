import express from 'express'
import {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getBootcampsInRadius
} from '../controllers/bootcamp.controller.js'
const bootcampRoute = express.Router()

bootcampRoute.get('/radius/:zipcode/:distance', getBootcampsInRadius)

bootcampRoute.get('/', getAll)

bootcampRoute.post('/', createOne)

bootcampRoute.get('/:id', getOne)

bootcampRoute.put('/:id', updateOne)

bootcampRoute.delete('/:id', deleteOne)

export default bootcampRoute
