import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  constructor(private localStorage:LocalStorageService) { }

  deleteGame(gameId:number){
    let allGames = this.getAllGames();
    delete allGames[gameId];
    this.localStorage.setItem('game',JSON.stringify(allGames));
  }

  getAllGames():{[key:string]:Game}{
    const localStorageString = this.localStorage.getItem('game') ?? '""';
    const obj = JSON.parse(localStorageString);
    if(typeof obj == "object")
      return obj;
    return {};
  }

  getFreeId():number{
    const allGameKeys = Object.keys(this.getAllGames());
    if(!allGameKeys.length)
      return 0;

    const highestExistingId =
      allGameKeys
        .map(key=>Number(key))  //Sort numerically
        .sort()                 //Sort from lowest to highest
        .slice(-1)[0]           //Get last element (=the highest)
      ;
    return highestExistingId + 1;
  }

  getGameById(id:number):Game{
    const allGames = this.getAllGames();
    return allGames[id] ?? {
      name: 'Wizards vs. Knights'
    };
  }

  setGameById(id:number,newGameValue:Game){
    let allGames = this.getAllGames();
    allGames[id] = newGameValue;
    this.localStorage.setItem('game',JSON.stringify(allGames));
  }
}
