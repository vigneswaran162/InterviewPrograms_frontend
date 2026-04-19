import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramMAsterService {

  //private apiUrl = 'http://localhost:3000/api/programs/';
  
  private apiUrl = 'https://backendapi-render.onrender.com/api/programs/';

  // ✅ Define headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // ✅ Get All Programs
  getAll(): Observable<any> {
    const APIUrl = this.apiUrl + 'GetPrograms';
    return this.http.get(APIUrl, { headers: this.headers });
  }

  // ✅ Get Program By Id
  getById(id: string): Observable<any> {
    const APIUrl = this.apiUrl + 'GetProgramById/' + id;
    return this.http.get(APIUrl, { headers: this.headers });
  }

  // ✅ Insert Program
  insert(data: any): Observable<any> {
    const APIUrl = this.apiUrl + 'AddProgram';
    return this.http.post(APIUrl, data, { headers: this.headers });
  }

  // ✅ Update Program
  update(id: string, data: any): Observable<any> {
    const APIUrl = this.apiUrl + 'UpdateProgram/' + id;
    return this.http.put(APIUrl, data, { headers: this.headers });
  }

  // ✅ Delete Program
  delete(id: string): Observable<any> {
    const APIUrl = this.apiUrl + 'DeleteProgram/' + id;
    return this.http.delete(APIUrl, { headers: this.headers });
  }

}