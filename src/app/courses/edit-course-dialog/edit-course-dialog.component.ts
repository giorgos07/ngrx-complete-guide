import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../app.reducer';
import { Course } from '../model/course';
import { courseUpdated } from '../courses.actions';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private store: Store<AppState>,
    private courseEntityService: CourseEntityService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;
    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };
    if (this.mode === 'update') {
      this.form = this.formBuilder.group(formControls);
      this.form.patchValue({ ...data.course });
    } else if (this.mode === 'create') {
      this.form = this.formBuilder.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  public form: FormGroup;
  public dialogTitle: string;
  public course: Course;
  public mode: 'create' | 'update';
  public loading$: Observable<boolean>;

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    const course: Course = {
      ...this.course,
      ...this.form.value
    };
    if (this.mode === 'update') {
      this.courseEntityService.update(course);
      this.dialogRef.close();
    } else if (this.mode === 'create') {
      this.courseEntityService.add(course).subscribe(_ => {
        this.dialogRef.close();
      });
    }
  }
}
