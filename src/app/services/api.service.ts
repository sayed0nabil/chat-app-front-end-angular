import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }

  get(resourcePath: string){
    const jwt:string = localStorage.getItem("jwt");
    return this._httpClient.get<Config>(this.apiUrl + resourcePath, {observe: 'response'});
  }

  post(resourcePath: string, body:Object){
    console.log("Updating Posting...");
    return this._httpClient.post(this.apiUrl + resourcePath, body);
  }
}
