import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
    constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('course', httpClient, httpUrlGenerator);
    }

    public getAll(): Observable<Course[]> { 
        return this.http.get('/api/courses').pipe(map(response => response['payload']));
    }
}
