import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerStorageService {

  constructor(
    private localStorage:LocalStorageService,
  ) { }

  getPlayerId(){
    return this.localStorage.getItem('playerId') ?? 'guest';
  }

  setPlayerId(newPlayerId:string){
    this.localStorage.setItemRaw('playerId',newPlayerId);
  }
}
