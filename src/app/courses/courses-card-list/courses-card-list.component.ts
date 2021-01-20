import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../model/course';
import { CourseEntityService } from '../services/course-entity.service';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private courseEntityService: CourseEntityService
  ) { }

  @Input() public courses: Course[];
  @Output() public courseChanged = new EventEmitter();

  public ngOnInit(): void { }

  public editCourse(course: Course): void {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update'
    };
    this.dialog.open(EditCourseDialogComponent, dialogConfig).afterClosed().subscribe(() => this.courseChanged.emit());
  }

  public onDeleteCourse(course: Course): void {
    this.courseEntityService.delete(course);
  }
}
