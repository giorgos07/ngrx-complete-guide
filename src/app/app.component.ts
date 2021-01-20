import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AuthActions } from './auth/action-types';
import { isLoggedIn } from './auth/auth.selectors';
import { LocalStorageKeys } from './local-storage-keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  public loading = true;
  public isLoggedIn$: Observable<boolean>;

  public ngOnInit(): void {
    const user = localStorage.getItem(LocalStorageKeys.User);
    if (user) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(user) }));
    }
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.isLoggedIn$ = this.store.select(isLoggedIn);
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
