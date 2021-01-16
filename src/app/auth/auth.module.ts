import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { AuthGuard } from './auth.guard';
import { authReducer } from './auth.reducer';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([AuthEffects]),
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
        StoreModule.forFeature('auth', authReducer)
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService,
                AuthGuard
            ]
        };
    }
}
