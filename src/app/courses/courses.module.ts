import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { compareCourses } from './model/course';
import { compareLessons } from './model/lesson';
import { CourseComponent } from './course/course.component';
import { CourseEntityService } from './services/course-entity.service';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { CoursesDataService } from './services/courses-data.service';
import { CoursesEffects } from './courses.effects';
import { CoursesHttpService } from './services/courses-http.service';
import { coursesReducer } from './courses.reducer';
import { CoursesResolver } from './courses.resolver';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { HomeComponent } from './home/home.component';
import { LessonEntityService } from './services/lesson-entity.service';

export const coursesRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  resolve: { courses: CoursesResolver }
}, {
  path: ':courseUrl',
  component: CourseComponent
}
];

const entityMetadata: EntityMetadataMap = {
  course: {
    sortComparer: compareCourses,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true
    }
  },
  lesson: {
    sortComparer: compareLessons
  }
};

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([CoursesEffects]),
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    StoreModule.forFeature('courses', coursesReducer)
  ],
  declarations: [
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    HomeComponent
  ],
  exports: [
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    HomeComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CourseEntityService,
    CoursesDataService,
    CoursesHttpService,
    CoursesResolver,
    LessonEntityService
  ]
})
export class CoursesModule {
  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService
  ) {
    this.entityDefinitionService.registerMetadataMap(entityMetadata);
    this.entityDataService.registerService('course', this.coursesDataService);
  }
}
