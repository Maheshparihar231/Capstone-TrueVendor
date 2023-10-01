import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:8002/findservice';
  private apiGetAll = 'http://localhost:8002/findservice/services';

  constructor(private _http: HttpClient) { }

  getSearchData(query: string): Observable<any[]> {
    const params = new HttpParams().set('query', query);
    const searchUrl = `${this.apiUrl}/search`;

    return this._http.get<any[]>(searchUrl, { params });
  }

  loadAllServices():Observable<any>{
    return this._http.get<any>(this.apiGetAll);
  }

  addService(data : any):Observable<any>{
    return this._http.post<any>( `${this.apiUrl}/save`,data);
  }

}
