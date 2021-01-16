import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { getAdvancedCourses, getBeginnerCourses, getPromoTotal } from '../courses.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>) {
  }

  public promoTotal$: Observable<number>;
  public beginnerCourses$: Observable<Course[]>;
  public advancedCourses$: Observable<Course[]>;

  public ngOnInit(): void {
    this.reload();
  }

  public reload(): void {
    this.beginnerCourses$ = this.store.select(getBeginnerCourses);
    this.advancedCourses$ = this.store.select(getAdvancedCourses);
    this.promoTotal$ = this.store.select(getPromoTotal);
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
