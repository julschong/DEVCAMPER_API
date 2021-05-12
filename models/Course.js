import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Please add a course title']
        },
        description: {
            type: String,
            required: [true, 'Please add a description']
        },
        weeks: {
            type: String,
            required: [true, 'Please add number of weeks duration']
        },
        tuition: {
            type: Number,
            required: [true, 'Please add a tuition cost']
        },
        minimumSkill: {
            type: String,
            required: [true, 'Please add a minimum skill'],
            enum: ['beginner', 'intermediate', 'advanced']
        },
        scholarshipAvailable: {
            type: Boolean,
            default: false
        },
        bootcamp: {
            type: mongoose.Schema.ObjectId,
            ref: 'Bootcamp',
            required: true
        }
    },
    { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);

export default Course;
