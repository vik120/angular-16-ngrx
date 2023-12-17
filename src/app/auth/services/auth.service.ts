import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginRequestInterface } from '../type/loginRequest.interface';
import { map, Observable } from 'rxjs';
import { tokenInterface } from '../type/token.interface';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) { }
    login(data: loginRequestInterface): Observable<tokenInterface> {
        let urlParameters = Object.entries(data).map(e => e.join('=')).join('&');
        const url = environment.apiUrl +'auth/login'
        return this.http.post<tokenInterface>(url, data).pipe(
            map((response:tokenInterface) => {
                return response
            })
        )
    }
}