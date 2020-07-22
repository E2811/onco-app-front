import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  tokenType: string;
  accessToken: string;
  username: string;
  userRole: string;
  baseURL: string = 'http://localhost:8080/';

  constructor(private router: Router, 
              private httpClient: HttpClient) {}

  public setUser(user) {
    this.tokenType = user.tokenType;
    this.accessToken = user.accessToken;
    this.username = user.username;
    this.userRole = user.userRole;
    localStorage.setItem('role', this.userRole);
    localStorage.setItem('username', this.username);
  }

  public getToken() {
    return `${this.tokenType} ${this.accessToken}`;
  }

  public isAdmin() {
    return this.userRole === 'ROLE_ADMIN';
  }
  public getRole() {
    return this.userRole;
  }
  public getUsername(){
    return this.username;
  }

  public authRequest(data) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.baseURL}auth/sign-in`, data).subscribe(
        (postedData) => {
          this.setUser(postedData);
          resolve(postedData);
        },
        (error) => {
          reject(error.error.message);
        }
      );
    });
  }

  public logout() {
    this.tokenType = '';
    this.accessToken = '';
    this.username = '';
    this.userRole = '';
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  public getRequest(url): any {
    const headers = new HttpHeaders().set('Authorization', this.getToken());
    console.log(headers);
    return this.httpClient.get<any>(`${this.baseURL}${url}`, { headers });
  }

  public postRequest(url, data): any {
    const headers = new HttpHeaders().set('Authorization', this.getToken());
    return this.httpClient.post(`${this.baseURL}${url}`, data, { headers });
  }

  public putRequest(url, data): any {
    const headers = new HttpHeaders().set('Authorization', this.getToken());
    console.log(headers);
    return this.httpClient.put(`${this.baseURL}${url}`, data, { headers });
  }

  public deleteRequest(url) {
    const headers = new HttpHeaders().set('Authorization', this.getToken());
    return this.httpClient.delete(`${this.baseURL}${url}`, { headers });
  }
}
