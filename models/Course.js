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

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ]);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(
            bootcampId,
            {
                averageCost: (Math.ceil(obj[0].averageCost) / 10) * 10
            },
            { new: true }
        );
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageCost after save
CourseSchema.post('save', async function () {
    await this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost after save
CourseSchema.pre('remove', async function () {
    await this.contructor.getAverageCost(this.bootcamp);
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
