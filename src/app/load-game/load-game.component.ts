import { Component } from '@angular/core';
import { GameStorageService } from '../game-storage.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-load-game',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './load-game.component.html',
  styleUrl: './load-game.component.less'
})
export class LoadGameComponent {
  constructor(
    private gameStorageService:GameStorageService,
  ){

  }

  deleteGame(gameId:number){
    this.gameStorageService.deleteGame(gameId);
  }

  getAllGames(){
    return this.gameStorageService.getAllGames();
  }

  getAllGamesAsKeyValuePair(){
    const allGames = this.getAllGames();
    return Object.keys(allGames)
            .map(key => ({ key: Number(key), value: allGames[key] }))
            .sort((a,b)=>a.key-b.key)
            ;
  }
}
