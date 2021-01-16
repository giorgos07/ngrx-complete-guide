import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const getCoursesState = createFeatureSelector<fromCourses.CoursesState>('courses');
export const getAllCourses = createSelector(getCoursesState, fromCourses.selectAll);
export const getBeginnerCourses = createSelector(getAllCourses, courses => courses.filter(course => course.category === 'BEGINNER'));
export const getAdvancedCourses = createSelector(getAllCourses, courses => courses.filter(course => course.category === 'ADVANCED'));
export const getPromoTotal = createSelector(getAllCourses, courses => courses.filter(course => course.promo).length);
export const areCoursesLoaded = createSelector(getCoursesState, state => state.allCoursesLoaded);
