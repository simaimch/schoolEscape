import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerStorageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getData<T>(scriptName:string){
    return this.httpClient.get<T>(`http://edu.hoffmannc.net/SchoolEscapeServer/${scriptName}.php`,{responseType:'json'});
  }
}
