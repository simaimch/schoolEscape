import { Component, Input } from '@angular/core';
import { Tile } from '../tile';
import { Wall } from '../wall';
import { NgFor } from '@angular/common';
import { EAdjacencyType, PositionServiceService } from '../position-service.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.less'
})
export class TileComponent {
  @Input() public tile!:Tile;

  constructor(
    private positionService: PositionServiceService
  ){

  }

  get walls():Wall[]{
    return this.tile.walls;
  }

  get wallsWithAbsoluteCoordinates(){
    return this.walls
      .map(wall => {
        switch(this.positionService.positionsAdjacency(wall.position.position1,wall.position.position2)){
          case EAdjacencyType.HORIZONTAL:
            return Object.assign({},wall,{
              x1: wall.position.position1.x-1,
              x2: wall.position.position2.x-1,
              y1: wall.position.position1.y,
              y2: wall.position.position2.y,

            });
          case EAdjacencyType.VERTICAL:
            return Object.assign({},wall,{
              x1: wall.position.position1.x,
              x2: wall.position.position2.x,
              y1: wall.position.position1.y-1,
              y2: wall.position.position2.y-1,

            });
        }
        console.error('Invalid adjacency of wall',wall);
        return Object.assign({},wall,{
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 0,

            });

      })
  }
}
