import { Wall } from "./wall";

export interface Tile {
  x:number;
  y:number;
  walls: Wall[];
}
