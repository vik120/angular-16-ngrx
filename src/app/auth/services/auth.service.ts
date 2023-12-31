import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginRequestInterface } from '../type/loginRequest.interface';
import { map, Observable } from 'rxjs';
import { tokenInterface } from '../type/token.interface';
import { environment } from 'src/environment/environment';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private persistance: PersistanceService, private router: Router) { }
    login(data: loginRequestInterface): Observable<tokenInterface> {
        const url = environment.apiUrl +'auth/login'
        return this.http.post<tokenInterface>(url, data).pipe(
            map((response:tokenInterface) => {
                return response
            })
        )
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + 'auth/profile'
        return this.http.get<any>(url).pipe(
            map((user: CurrentUserInterface) => {
                return user
            })
        )
    }

    refreshToken(token: string) {
        const url = environment.apiUrl + 'auth/refresh-token'
        return this.http.post(url + 'refreshtoken', {
          refreshToken: token
        });
    }

    logout() {
        this.persistance.removeToken('accessToken')
        this.persistance.removeToken('refreshToken')
    }
}