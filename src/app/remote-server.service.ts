import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteServerService {

  baseUrl:string = 'http://edu.hoffmannc.net/SchoolEscapeServer/';
  constructor() { }

  getRequestUrl(functionName:string,parameters:{[key:string]:string}){
    let url = this.baseUrl+functionName+'.php';
    let parameterEntries = Object.entries(parameters);
    for(let i=0; i< parameterEntries.length;i++)
      url += (i==0 ? '?' : '&') + parameterEntries[i][0]+'='+parameterEntries[i][1];
    return url;
  }
}
