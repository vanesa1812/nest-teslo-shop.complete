
import { HttpClient } from '@angular/common/http';

import { computed, inject, Injectable, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import type { AuthResponse } from '@auth/interfaces/auth-response.interfaces';

import type { User } from '@auth/interfaces/user.interface';

import { catchError, map, of, type Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false)
  token = computed(this._token);

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleLoginSuccess(resp)),
        catchError((error: any) => this.handleLoginError(error)),
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }


    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map((resp) => this.handleLoginSuccess(resp)),
        catchError((error: any) => this.handleLoginError(error)),
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleLoginSuccess(resp: AuthResponse): boolean {
    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);

    localStorage.setItem('token', resp.token);

    return true;
  }

  private handleLoginError(error: any): Observable<boolean> {
    this.logout();

    return of(false);
  }
}
