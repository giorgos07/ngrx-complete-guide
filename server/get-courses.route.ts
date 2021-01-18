import { Request, Response } from 'express';
import { Course } from '../src/app/courses/model/course';
import { COURSES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data ...');
  setTimeout(() => {
    res.status(200).json({ payload: Object.values(COURSES) });
  }, 500);
}

export function getCourseByUrl(req: Request, res: Response) {
  const courseUrl = req.params['courseUrl'];
  const courses: any = Object.values(COURSES);
  const course = courses.find((x: Course) => x.url === courseUrl);
  setTimeout(() => {
    res.status(200).json(course);
  }, 500);
}
