import { Application } from 'express';
import { createCourse } from './create-course.route';
import { deleteCourse } from './delete-course.route';
import { getAllCourses, getCourseByUrl } from './get-courses.route';
import { loginUser } from './auth.route';
import { saveCourse } from './save-course.route';
import { searchLessons } from './search-lessons.route';
import * as express from 'express';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());
app.route('/api/login').post(loginUser);
app.route('/api/courses').get(getAllCourses);
app.route('/api/course').post(createCourse);
app.route('/api/course/:id').put(saveCourse);
app.route('/api/course/:id').delete(deleteCourse);
app.route('/api/courses/:courseUrl').get(getCourseByUrl);
app.route('/api/lessons').get(searchLessons);

const httpServer: any = app.listen(9000, () => {
    console.log(`HTTP REST API Server running at http://localhost:${httpServer.address().port}`);
});
