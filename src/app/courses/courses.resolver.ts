import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { filter, finalize, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { areCoursesLoaded } from './courses.selectors';
import { loadAllCourses } from './courses.actions';

@Injectable()
export class CoursesResolver implements Resolve<void> {
    private _isLoading = false;

    constructor(private store: Store<AppState>) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((coursesLoaded: boolean) => {
                if (!this._isLoading && !coursesLoaded) {
                    this._isLoading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            filter(coursesLoaded => coursesLoaded),
            first(),
            finalize(() => this._isLoading = false)
        );
    }
}
