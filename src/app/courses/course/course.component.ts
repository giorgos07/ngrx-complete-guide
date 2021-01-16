import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesHttpService } from '../services/courses-http.service';
import { Lesson } from '../model/lesson';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute
  ) { }

  public course$: Observable<Course>;
  public lessons$: Observable<Lesson[]>;
  public displayedColumns = ['seqNo', 'description', 'duration'];
  public nextPage = 0;
  public loading$: Observable<boolean>;

  public ngOnInit(): void {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.coursesService.findCourseByUrl(courseUrl);
    this.lessons$ = this.course$.pipe(
      concatMap(course => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );
  }

  public loadLessonsPage(course: Course): void { }
}
