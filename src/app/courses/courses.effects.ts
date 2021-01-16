import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { allCoursesLoaded } from './courses.actions';
import { CoursesActions } from './action-types';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions: Actions,
        private coursesHttpService: CoursesHttpService
    ) { }

    public loadAllCourses$ = createEffect(() => this.actions.pipe(
        ofType(CoursesActions.loadAllCourses),
        concatMap(_ => this.coursesHttpService.findAllCourses()),
        map(courses => allCoursesLoaded({ courses: courses }))
    ));

    public updateCourse$ = createEffect(() => this.actions.pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
    ), { dispatch: false });
}
