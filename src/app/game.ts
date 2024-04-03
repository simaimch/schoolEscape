import { Pawn } from "./pawn";
import { Player } from "./player";
import { Tile } from "./tile";

export interface Game {
  name:string;
  pawns:{[key:string]:Pawn};
  playerIds:{[key:string]:string};
  playerTurn:string;
  remainingMoves: number;
  tiles: Tile[];
  selectedPawnIndex: string;
}
