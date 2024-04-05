import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameStorageService } from '../game-storage.service';
import { Game } from '../game';
import { Tile } from '../tile';
import { HttpClientModule } from '@angular/common/http';
import { PlayerStorageService } from '../player-storage.service';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.less'
})
export class NewGameComponent {

  opponentId:string='guest';

  constructor(
    private router:Router,
    private gameStorageService:GameStorageService,
    private playerStorageService: PlayerStorageService,
    ){}

  startGame(){
    const gameId: number = this.gameStorageService.getFreeId();

    const playerIds = [
      this.playerStorageService.getPlayerId(),
      this.opponentId,
    ];

    let tiles:Tile[] = [];
    for(let x=0;x<=1;x++)
      for(let y=0;y<=3;y++)
        tiles.push({x:x*5+1,y:y*5+1,walls:[{position:{position1:{x:2,y:2},position2:{x:2,y:3}}},{position:{position1:{x:2,y:2},position2:{x:3,y:2}}}]});

    const newGame:Game = {
      name: 'lalala',
      pawns:{
        'A':{position:{x:2,y:2},image:'https://miro.medium.com/v2/resize:fit:1400/0*p1AF_fHdLd2JkoDA.png',ownerId:playerIds[0]},
        'B':{position:{x:4,y:4},image:'https://miro.medium.com/v2/resize:fit:1400/0*p1AF_fHdLd2JkoDA.png',ownerId:playerIds[1]},
      },
      playerIds:playerIds,
      playerTurn:this.playerStorageService.getPlayerId(),
      remainingMoves:4,
      selectedPawnIndex:'',
      tiles: tiles
    };

    this.gameStorageService.setGameById(gameId,newGame);

    this.router.navigate(['game',gameId]);
  }
}
