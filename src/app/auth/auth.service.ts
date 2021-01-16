import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from './model/user.model';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>('/api/login', { email, password });
    }
}
