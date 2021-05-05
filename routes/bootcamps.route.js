import express from 'express'
import {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
} from '../controllers/bootcamp.controller.js'
const bootcampRoute = express.Router()

bootcampRoute.get('/', getAll)

bootcampRoute.post('/', createOne)

bootcampRoute.get('/:id', getOne)

bootcampRoute.put('/:id', updateOne)

bootcampRoute.delete('/:id', deleteOne)

export default bootcampRoute
