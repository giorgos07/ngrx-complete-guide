import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Course } from '../model/course';
import { CourseEntityService } from '../services/course-entity.service';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private courseEntityService: CourseEntityService) {
  }

  public promoTotal$: Observable<number>;
  public beginnerCourses$: Observable<Course[]>;
  public advancedCourses$: Observable<Course[]>;

  public ngOnInit(): void {
    this.reload();
  }

  public reload(): void {
    this.beginnerCourses$ = this.courseEntityService.entities$.pipe(map(courses => courses.filter(course => course.category === 'BEGINNER')));
    this.advancedCourses$ = this.courseEntityService.entities$.pipe(map(courses => courses.filter(course => course.category === 'ADVANCED')));
    this.promoTotal$ = this.courseEntityService.entities$.pipe(map(courses => courses.filter(course => course.promo).length));
  }

  public onAddCourse(): void {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };
    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
