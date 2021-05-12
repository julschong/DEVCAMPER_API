import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
// Load env vars
dotenv.config({ path: './config/.env' });
// Load Model
import Bootcamp from './models/Bootcamp.js';
import Course from './models/Course.js';

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`./_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(fs.readFileSync(`./_data/courses.json`, 'utf-8'));

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
};

// Delete data
const DeleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Deleted'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.disconnect();
    }
};

if (process.argv.length !== 3) {
    console.log('*** Use -i to import data \n*** Use -d to delete data');
    process.exit(-1);
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    DeleteData();
}
