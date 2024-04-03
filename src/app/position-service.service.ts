import { Injectable } from '@angular/core';
import { BetweenPosition } from './between-position';
import { Position } from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionServiceService {

  constructor() { }

  betweenPositionsAreEqual(...bpos:BetweenPosition[]):boolean{
    if(bpos.length < 2)
      return true;
    for(const bp of bpos){
      if(
        !(
          this.positionsAreEqual(bp.position1,bpos[0].position1) && this.positionsAreEqual(bp.position2,bpos[0].position2)
          ||
          this.positionsAreEqual(bp.position1,bpos[0].position2) && this.positionsAreEqual(bp.position2,bpos[0].position1)
        )
      )
        return false;
    }
    return true;
  }

  positionsAdjacency(p1:Position,p2:Position):EAdjacencyType{
    if(Math.abs(p1.x - p2.x) == 0 && Math.abs(p1.y - p2.y) == 0)
      return EAdjacencyType.IDENTICAL;
    if(Math.abs(p1.x - p2.x) == 1 && Math.abs(p1.y - p2.y) == 0)
      return EAdjacencyType.HORIZONTAL;
    if(Math.abs(p1.x - p2.x) == 0 && Math.abs(p1.y - p2.y) == 1)
      return EAdjacencyType.VERTICAL;
    if(Math.abs(p1.x - p2.x) == 1 && Math.abs(p1.y - p2.y) == 1)
      return EAdjacencyType.DIAGONAL;
    return EAdjacencyType.NONE;
  }

  positionsAreEqual(...pos:Position[]):boolean{
    if(pos.length < 2)
      return true;
    for(const p of pos){
      if(p.x != pos[0].x || p.y != pos[0].y)
        return false;
    }
    return true;
  }

  positionsSum(...pos:Position[]):Position{
    let result:Position = {x:0,y:0};
    for(const p of pos){
      result.x += p.x;
      result.y += p.y;
    }
    return result;
  }


}

export enum EAdjacencyType{
  IDENTICAL,
  VERTICAL,
  HORIZONTAL,
  DIAGONAL,
  NONE
}
