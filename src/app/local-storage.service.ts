import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getStorageEngine(useLocalStorage=true):Storage{
    if(useLocalStorage)
      return localStorage;
    return sessionStorage;
  }

  clear(useLocalStorage=true): void {
    this.getStorageEngine(useLocalStorage).clear();
  }

  getItem(key: string,useLocalStorage=true): string | null {
    return this.getStorageEngine(useLocalStorage).getItem(key);
  }

  getItemParsed<T>(key: string,def:T,useLocalStorage=true):T{
    let result = this.getItem(key,useLocalStorage);
    if(!result)
      return def;
    return JSON.parse(result);
  }

  removeItem(key: string,useLocalStorage=true): void {
    this.getStorageEngine(useLocalStorage).removeItem(key);
  }

  setItem(key:string, value: any, useLocalStorage=true):void{
    this.setItemRaw(key,JSON.stringify(value),useLocalStorage);
  }

  setItemRaw(key: string, value: string,useLocalStorage=true): void {
    this.getStorageEngine(useLocalStorage).setItem(key, value);
  }
}
