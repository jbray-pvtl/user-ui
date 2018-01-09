import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticateService {

  authenticated = false;
  authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  authenticate(credentials) {
    console.info(credentials);
    let authHeaders: HttpHeaders = new HttpHeaders();
    authHeaders.append('Authorization', 'Basic');
    return this.http.get(this.authUrl, {headers: authHeaders});
  }

}
