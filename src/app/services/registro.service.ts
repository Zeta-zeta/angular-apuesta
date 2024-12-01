import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8090/api/usuario'

  constructor(
    private http: HttpClient
  ){}


  postData(data:any): Observable<any>{
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl,data, {headers});
  }


}
