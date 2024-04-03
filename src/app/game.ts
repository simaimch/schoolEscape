import { Pawn } from "./pawn";
import { Tile } from "./tile";

export interface Game {
  name:string;
  pawns:{[key:string]:Pawn};
  tiles: Tile[];
  selectedPawnIndex: string;
}
