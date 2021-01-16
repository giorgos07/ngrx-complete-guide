import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { compareCourses, Course } from './model/course';
import { CoursesActions } from './action-types';

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    selectId: course => course.id // This is the default.
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const { selectAll } = adapter.getSelectors();

export const coursesReducer = createReducer(initialCoursesState,
    on(CoursesActions.allCoursesLoaded, (state, action) => adapter.setAll(action.courses, {
        ...state,
        allCoursesLoaded: true
    })),
    on(CoursesActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
);
