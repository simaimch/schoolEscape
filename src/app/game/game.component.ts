import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Game } from '../game';
import { GameStorageService } from '../game-storage.service';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../tile';
import { NgForOf } from '@angular/common';
import { Pawn } from '../pawn';
import { PawnComponent } from '../pawn/pawn.component';
import { ReachablePositionComponent } from '../reachable-position/reachable-position.component';
import { Position } from '../position';
import { Wall } from '../wall';
import { BetweenPosition } from '../between-position';
import { PositionServiceService } from '../position-service.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    PawnComponent,
    ReachablePositionComponent,
    TileComponent,
    NgForOf,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.less'
})
export class GameComponent {

  gameId:number = -1;

  constructor(
    private gameStorageService:GameStorageService,
    private activatedRoute:ActivatedRoute,
    private positionServiceService:PositionServiceService,
    ){
      this.gameId = Number(this.activatedRoute.snapshot.params['id']);
  }

  activatePosition(position:Position){
    let pawn = this.selectedPawn;
    if(!pawn)
      return;
    pawn.position = position;
    this.updatePawn(null,pawn);
  }

  get game():Game{
    return this.gameStorageService.getGameById(this.gameId);
  }

  positionsAreAdjacent(position1:Position,position2:Position):boolean{
    return (
          Math.abs(position1.x - position2.x) == 0 && Math.abs(position1.y - position2.y) == 1
          ||
          Math.abs(position1.x - position2.x) == 1 && Math.abs(position1.y - position2.y) == 0
    );
  }

  positionsDistance(position1:Position,position2:Position):number{
    if(!this.positionsAreAdjacent(position1,position2))
      return Infinity;

    if(!this.positionIsOnField(position1) || !this.positionIsOnField(position2))
      return Infinity;
    if(this.wallIsInBetween(position1,position2))
      return Infinity;
    return 1;
  }

  get wallsWithGlobalPositions():Wall[]{
    let walls:Wall[] = [];

    for(const tile of this.game.tiles){
      for(const wall of tile.walls){
        walls.push(
          {
            position:{
              position1: this.positionServiceService.positionsSum(wall.position.position1,{x:tile.x,y:tile.y},{x:-1,y:-1}),
              position2: this.positionServiceService.positionsSum(wall.position.position2,{x:tile.x,y:tile.y},{x:-1,y:-1}),
            }
          }
        );
      }
    }

    return walls;
  }

  wallIsInBetween(position1:Position,position2:Position):boolean{
    let wallPosition:BetweenPosition = {position1: position1, position2: position2};

    for(const wall of this.wallsWithGlobalPositions)
      if(this.positionServiceService.betweenPositionsAreEqual(wallPosition,wall.position))
        return true;
    return false;
  }

  positionIsOnField(position:Position):boolean{
    return (
      position.x >= 1 &&
      position.x <= 10 &&
      position.y >= 1 &&
      position.x <= 20 &&
      true
    );
  }

  get reachablePositions():Position[]{
    if(!this.selectedPawn)
      return [];
    return this.reachablePositionsByPositionRangeAndMovement(this.selectedPawn.position,2);
  }

  reachablePositionsByPositionRangeAndMovement(position:Position,range:number,movement?:any):Position[]{

    const maxPositionLength = 1000;

    function positionInPositionsList(position:Position):boolean{
      return !!positions.find((p)=> p.position.x == position.x && p.position.y == position.y);
    }

    let positions = [{position:position,reachedBy:position,distance:0}];
    for(let i=0; i < positions.length && i < maxPositionLength; i++){
      const currentPosition = positions[i].position;
      const currentDistance = positions[i].distance;
      if(currentDistance == range)
        continue;
      for(const positionOffset of [{x:-1,y:0},{x:1,y:0},{x:0,y:1},{x:0,y:-1}]){
        const checkPosition:Position = {
          x: currentPosition.x + positionOffset.x,
          y: currentPosition.y + positionOffset.y,
        }
        if(
            !positionInPositionsList(checkPosition) &&
            this.positionsDistance(currentPosition,checkPosition) <= 1 &&
            true
          )
          positions.push({position:checkPosition,reachedBy:currentPosition,distance:currentDistance+1});
      }
    }

    return positions.map((p)=>p.position);

    /*const x = position.x;
    const y = position.y;
    let positions: Position[] = [];
    for(let xCheck = x - range; xCheck <= x + range; xCheck++)
      for(let yCheck = y - range; yCheck <= y + range; yCheck++)
        if(this.positionIsOnField({x:xCheck,y:yCheck})){
          positions.push({x:xCheck,y:yCheck});
        }

    return positions;*/



  }




  updateName(newName:string){
    let game: Game = this.game;
    game.name = newName;
    this.gameStorageService.setGameById(this.gameId,game);
  }



  //#region Pawns

  getAllPawnsAsKeyValuePair(){
    const allPawns = this.pawns;
    return Object.keys(allPawns)
            .map(key => ({ key: key, value: allPawns[key] }))
            ;
  }

  get pawns():{[key:string]:Pawn}{
    return this.game.pawns;
  }

  get selectedPawn():Pawn|null{
    const selectedPawnIndex = this.game.selectedPawnIndex;
    if(!selectedPawnIndex)
      return null;
    const allPawns = this.pawns;
    if(!allPawns[selectedPawnIndex])
      return null;
    return allPawns[selectedPawnIndex];
  }

  updatePawn(pawnId:string|null,newPawnData:Pawn){
    pawnId ??= this.game.selectedPawnIndex;
    let game: Game = this.game;
    let pawnData = game.pawns;
    pawnData[pawnId] = newPawnData;
    game.pawns =pawnData;
    this.gameStorageService.setGameById(this.gameId,game);
  }

  updateSelectedPawn(newPawnId:string){
    let game: Game = this.game;
    game.selectedPawnIndex = newPawnId;
    this.gameStorageService.setGameById(this.gameId,game);
  }

  //#endregion

  //#region Tiles
  get tiles():Tile[]{
    return this.game.tiles;
  }
  //#endregion
}
