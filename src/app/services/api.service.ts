import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../logs-data/log'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_endpoint = Constants.apiURL;

  constructor(private http: HttpClient) { }

  public get(options?: any) : Observable<Log>
  { 
    let parameters = options;
    let queryParams = new HttpParams({ fromObject: parameters }); 
    return this.http.get<Log>(this.api_endpoint + '/get-logs',{params:queryParams}); 
  } 
    
  public post(url: string, data: any, options?: any) 
  { 
    return this.http.post(url, data, options); 
  } 
    
  public put(url: string, data: any, options?: any) 
  { 
    return this.http.put(url, data, options); 
  } 

  public delete(url: string, options?: any) 
  { 
    return this.http.delete(url, options); 
  } 

}
