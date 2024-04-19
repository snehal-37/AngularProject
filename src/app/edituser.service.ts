import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EdituserService {
  private url = 'http://localhost:3000/user';
  imageData: string | ArrayBuffer | null = '';

  constructor(private http: HttpClient) {}

  editUser(data: any): Observable<any> {
    const timestamp = { ...data, timestamp: new Date().toISOString() };
    return this.http.post(`${this.url}`, timestamp);
  }
  getUserDetails(): Observable<any> {
    return this.http.get('http://localhost:3000/user?_sort=-timestamp');
  }
  setImageData(data: string | ArrayBuffer | null) {
    this.imageData = data;
  }

  getImageData(): string | ArrayBuffer | null {
    return this.imageData;
  }
}
