import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { CourseEntityService } from '../services/course-entity.service';
import { Lesson } from '../model/lesson';
import { LessonEntityService } from '../services/lesson-entity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  constructor(
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
    private route: ActivatedRoute
  ) { }

  public course$: Observable<Course>;
  public lessons$: Observable<Lesson[]>;
  public displayedColumns = ['seqNo', 'description', 'duration'];
  public nextPage = 0;
  public loading$: Observable<boolean>;

  public ngOnInit(): void {
    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.find(course => course.url === courseUrl))
    );
    this.lessons$ = this.lessonEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([_, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course)
        }
      }),
      map(([lessons, course]) => lessons.filter(lesson => lesson.courseId === course.id))
    );
  }

  public loadLessonsPage(course: Course): void {
    this.lessonEntityService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    });
    this.nextPage += 1;
  }
}
