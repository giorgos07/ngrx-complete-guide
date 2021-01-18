import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { filter, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CourseEntityService } from './services/course-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
    constructor(private courseEntityService: CourseEntityService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.courseEntityService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.courseEntityService.getAll();
                }
            }),
            filter(loaded => !!loaded),
            first()
        );
    }
}
