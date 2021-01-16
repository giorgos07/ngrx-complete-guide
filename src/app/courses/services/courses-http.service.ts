import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CoursesHttpService {
    constructor(private http: HttpClient) { }

    public findAllCourses(): Observable<Course[]> {
        return this.http.get('/api/courses').pipe(map(res => res['payload']));
    }

    public findCourseByUrl(courseUrl: string): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseUrl}`);
    }

    public findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
        return this.http.get<Lesson[]>('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('sortOrder', 'asc')
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        });
    }


    public saveCourse(courseId: number | string, changes: Partial<Course>) {
        return this.http.put('/api/course/' + courseId, changes);
    }
}
