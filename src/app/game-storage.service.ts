import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Game } from './game';
import { Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlayerStorageService } from './player-storage.service';
import { RemoteServerService } from './remote-server.service';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  constructor(
    private localStorage:LocalStorageService,
    private http: HttpClient,
    private playerStorage: PlayerStorageService,
    private remoteServer: RemoteServerService,
    ) { }

  deleteGame(gameId:number){
    let allGames = this.getAllGames();
    delete allGames[gameId];
    this.localStorage.setItemRaw('game',JSON.stringify(allGames));
  }

  private cachedOwnedGames$: Observable<{[key:string]:Game}> | undefined;

  getOwnedGames(forceRefresh=false):Observable<{[key:string]:Game}>{
    if(forceRefresh)
      this.cachedOwnedGames$ = undefined;
    if (!this.cachedOwnedGames$) {
      this.cachedOwnedGames$ = this.http.get<any>(this.remoteServer.getRequestUrl('gamesOwned',{player:this.playerStorage.getPlayerId()})).pipe(
        tap(data => console.log('Fetched data', data)),
        catchError(error => {
          console.error('Error fetching data', error);
          return of(null); // Return an empty observable to prevent errors from propagating
        }),
        shareReplay(1) // Cache the last emitted value and replay it to new subscribers
      );
    }
    return this.cachedOwnedGames$;
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
    this.localStorage.setItemRaw('game',JSON.stringify(allGames));
  }
}
